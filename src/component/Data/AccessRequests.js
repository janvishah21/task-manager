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
import { accessRequestsStyles } from '../../styles/AccessRequests.style';
import { getAccessRequests } from '../../service/access-request.service';
import TimeRenderer from '../shared/grid/cell-renderers/TimeRenderer';
import AccessRequestActionsRenderer from '../shared/grid/cell-renderers/AccessRequestActionsRenderer';
import { userIDFormatter } from '../shared/grid/formatters';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { accessRequestStatusStyler } from '../shared/grid/cellStyles';

function AccessRequests() {

    const styles = accessRequestsStyles();

    const [rowData, setRowData] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    useEffect(() => {
        const getAllAccessRequests = async () => {
            let { data, error } = await getAccessRequests(user.token);
            if (error) {
                error = await error.json();
                dispatch(updateNotificationState({
                    isOpen: true,
                    message: error.message,
                    type: 'error'
                }));
            } else {
                setRowData(data || []);
            }
        }
        getAllAccessRequests();
    }, []);

    const modules = useMemo( ()=> [
        ClientSideRowModelModule, 
        RangeSelectionModule, 
        RowGroupingModule, 
        RichSelectModule], []);

    const frameworkComponents = {
        timeRenderer: TimeRenderer,
        accessRequestActionsRenderer: AccessRequestActionsRenderer
    };

    const columnDefs = useMemo(() => [
        {
            field: 'project.updatedAt',
            headerName: 'Last Updated',
            width: 260,
            cellRenderer: 'timeRenderer',
            sort: 'desc'
        },
        {
            field: 'project._id',
            headerName: 'Project ID'
        },
        {
            field: 'project.name',
            headerName: 'Project Name'
        },
        {
            field: 'project.owner',
            headerName: 'Project Admin',
            valueFormatter: userIDFormatter
        },
        {
            field: 'accessRequestedFor',
            headerName: 'Requested For',
            valueFormatter: userIDFormatter
        },
        {
            field: 'applicant',
            headerName: 'Raised By',
            valueFormatter: userIDFormatter
        },
        {
            field: 'status',
            headerName: 'Status',
            cellStyle: accessRequestStatusStyler
        },
        {
            cellRenderer: 'accessRequestActionsRenderer',
            width: 180
        }
    ], []);

    const defaultColDef = useMemo(()=> ({
        resizable: true,
        sortable: true,
        width: 150
    }), []);

    return (
        <div className={`ag-theme-alpine ${styles.root}`}>
            <div className={styles.gridHeader}>
                <Typography
                    className={styles.gridHeaderText}
                    sx={{ fontSize: 20}}
                    fontWeight="bold"
                >
                    Access Requests
                </Typography>
            </div>
            <AgGridReact 
                reactUi="true"
                className="ag-theme-alpine"
                modules={modules}
                frameworkComponents={frameworkComponents}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
            />
        </div>
    )
}

export default AccessRequests;
