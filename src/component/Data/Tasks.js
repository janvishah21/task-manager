import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { AgGridReact } from 'ag-grid-react';
import { tasksStyles } from '../../styles/Tasks.style';
import { getTasks } from '../../service/task.service';
import TimeRenderer from '../shared/grid/cell-renderers/TimeRenderer';
import { userIDFormatter } from '../shared/grid/formatters';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import { updateAuth } from '../../state-management/actions/Auth.actions';

function Tasks() {

    const styles = tasksStyles();

    const [rowData, setRowData] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const pageContentState = useSelector(state => state.pageContentState);

    useEffect(() => {
        const getAllTasks = async () => {
            let { data, error } = await getTasks(pageContentState.attrs.project.project._id, user.token);
            if (error) {
                if (error.status === 408) {
                    dispatch(updateNotificationState({
                        isOpen: true,
                        message: 'Session Expired, Please Login Again !',
                        type: 'error'
                    }));
                    dispatch(updateAuth({}));
                    dispatch(updatePopUpState({ login: true }));
                    return;
                }
                error = await error.json();
                dispatch(updateNotificationState({
                    isOpen: true,
                    message: error.message,
                    type: 'error'
                }));
            } else {
                setRowData(data || []);
                console.log(data)
            }
        }
        getAllTasks();
    }, []);

    const modules = useMemo( ()=> [
        ClientSideRowModelModule, 
        RangeSelectionModule, 
        RowGroupingModule, 
        RichSelectModule], []);

    const frameworkComponents = {
        timeRenderer: TimeRenderer
    };

    const columnDefs = useMemo(() => [
        {
            field: 'updatedAt',
            headerName: 'Last Updated',
            width: 260,
            cellRenderer: 'timeRenderer',
            sort: 'desc'
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 200
        },
        {
            field: 'assignee',
            valueFormatter: userIDFormatter
        },
        {
            field: 'reporter',
            valueFormatter: userIDFormatter
        },
        {
            field: 'status'
        }
    ], []);

    const defaultColDef = useMemo(()=> ({
        resizable: true,
        sortable: true,
        width: 150
    }), []);

    const gridOptions = {
        modules,
        frameworkComponents,
        defaultColDef,
        columnDefs
    };

    return (
        <div className={`ag-theme-alpine ${styles.root}`}>
            <div className={styles.gridHeader}>
                <Typography
                    className={styles.gridHeaderText}
                    sx={{ fontSize: 20 }}
                    fontWeight="bold"
                >
                    {pageContentState.attrs.project.project.name}
                </Typography>
                <Typography
                    className={styles.gridHeaderText}
                    sx={{ fontSize: 14 }}
                >
                    &gt; Tasks
                </Typography>
            </div>
            <AgGridReact 
                reactUi="true"
                className="ag-theme-alpine"
                gridOptions={gridOptions}
                rowData={rowData}
            />
        </div>
    )
}

export default Tasks;
