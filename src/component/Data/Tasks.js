import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { AgGridReact } from 'ag-grid-react';
import { tasksStyles } from '../../styles/Tasks.style';
import { getTasks } from '../../service/task.service';
import { defaultModules, defaultFrameworkComponents, defaultColDef, defaultGridOptions } from '../shared/grid/defaults';
import UserIDRenderer from '../shared/grid/cell-renderers/UserIDRenderer';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { reloadUsersState } from '../../state-management/storeUtils';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import { updateAuth } from '../../state-management/actions/Auth.actions';

function Tasks() {

    const styles = tasksStyles();

    const [rowData, setRowData] = useState();
    let gridApi = null;

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const pageContentState = useSelector(state => state.pageContentState);

    const updateUsersState = tasks => {
        const ids = new Set();
        tasks.forEach(task => {
            ids.add(task.assignee);
            ids.add(task.reporter);
        });
        reloadUsersState([ ...ids ]);
    }

    const getAllTasks = async () => {
        let { data, error } = await getTasks(pageContentState.attrs.project.project._id);
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
            updateUsersState(data || []);
        }
    }

    const frameworkComponents = {
        ...defaultFrameworkComponents,
        userIDRenderer: UserIDRenderer
    }

    const columnDefs = useMemo(() => [
        {
            field: 'updatedAt',
            headerName: 'Last Updated',
            width: 260,
            cellRenderer: 'timeRenderer',
            sort: 'desc',
            filter: 'agDateColumnFilter'
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 200
        },
        {
            field: 'assignee',
            cellRenderer: 'userIDRenderer',
            filter: 'agSetColumnFilter'
        },
        {
            field: 'reporter',
            cellRenderer: 'userIDRenderer',
            filter: 'agSetColumnFilter'
        },
        {
            field: 'status',
            filter: 'agSetColumnFilter'
        },
        {
            headerName: '',
            // cellRenderer: 'taskActionsRenderer',
            filter: false,
            sortable: false
        }
    ], []);

    const onGridReady = (params) => {
        gridApi = params.api;
        gridApi.showLoadingOverlay();
        getAllTasks();
    }

    const gridOptions = {
        ...defaultGridOptions,
        frameworkComponents,
        defaultColDef,
        columnDefs,
        onGridReady
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
                modules={defaultModules}
                gridOptions={gridOptions}
                rowData={rowData}
            />
        </div>
    )
}

export default Tasks;
