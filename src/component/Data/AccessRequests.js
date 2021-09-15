import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { AgGridReact } from 'ag-grid-react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { accessRequestsStyles } from '../../styles/AccessRequests.style';
import { getAccessRequests } from '../../service/access-request.service';
import { defaultModules, defaultFrameworkComponents, defaultColDef, defaultGridOptions } from '../shared/grid/defaults';
import AccessRequestActionsRenderer from '../shared/grid/cell-renderers/AccessRequestActionsRenderer';
import { userIDFormatter } from '../shared/grid/formatters';
import { updateAuth } from '../../state-management/actions/Auth.actions';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import { accessRequestStatusStyler } from '../shared/grid/cellStyles';
import CreateAccessRequest from '../pages/CreateAccessRequest';
import Popup from '../shared/Popup';
import Controls from '../controls/Controls';

function AccessRequests() {

    const styles = accessRequestsStyles();

    const [rowData, setRowData] = useState();
    const [gridApi, setGridApi] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const popUpState = useSelector(state => state.popUp);

    const getAllAccessRequests = async () => {
        let { data, error } = await getAccessRequests(user.token);
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
        }
    }

    const frameworkComponents = {
        ...defaultFrameworkComponents,
        accessRequestActionsRenderer: AccessRequestActionsRenderer
    };

    const columnDefs = useMemo(() => [
        {
            field: 'project.updatedAt',
            headerName: 'Last Updated',
            width: 260,
            cellRenderer: 'timeRenderer',
            sort: 'desc',
            filter: 'agDateColumnFilter'
        },
        {
            field: 'project._id',
            headerName: 'Project Key',
            filter: 'agSetColumnFilter'
        },
        {
            field: 'project.name',
            headerName: 'Project Name'
        },
        {
            field: 'project.owner',
            headerName: 'Project Admin',
            valueFormatter: userIDFormatter,
            filter: 'agSetColumnFilter'
        },
        {
            field: 'accessRequestedFor._id',
            headerName: 'Requested For',
            valueFormatter: userIDFormatter,
            filter: 'agSetColumnFilter'
        },
        {
            field: 'applicant',
            headerName: 'Raised By',
            valueFormatter: userIDFormatter,
            filter: 'agSetColumnFilter'
        },
        {
            field: 'status',
            headerName: 'Status',
            cellStyle: accessRequestStatusStyler,
            filter: 'agSetColumnFilter'
        },
        {
            cellRenderer: 'accessRequestActionsRenderer',
            width: 180,
            filter: false,
            sortable: false
        }
    ], []);

    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.showLoadingOverlay();
        getAllAccessRequests();
    }

    const gridOptions = {
        ...defaultGridOptions,
        frameworkComponents,
        defaultColDef,
        columnDefs,
        onGridReady
    };

    return (
        <>
            <div className={`ag-theme-alpine ${styles.root}`}>
                <div className={styles.gridHeader}>
                    <Typography
                        className={styles.gridHeaderText}
                        sx={{ fontSize: 20}}
                        fontWeight="bold"
                    >
                        Access Requests
                    </Typography>
                    <Controls.Button
                        text="Create Access Request"
                        endIcon={<AddCircleIcon />}
                        size="medium"
                        color="secondary"
                        disableElevation
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => dispatch(updatePopUpState({ createAccessRequest: true }))}
                    />
                </div>
                <AgGridReact 
                    reactUi="true"
                    className="ag-theme-alpine"
                    modules={defaultModules}
                    gridOptions={gridOptions}
                    rowData={rowData}
                />
            </div>
            <Popup 
                title="Create New Request"
                fullWidth={true}
                openPopup={popUpState.createAccessRequest}
                onClose={() => dispatch(updatePopUpState({ createAccessRequest: false }))}
                showCloseBtn={true}
            >
                <CreateAccessRequest />
            </Popup>
        </>
    )
}

export default AccessRequests;
