import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AgGridReact } from 'ag-grid-react';
import { projectsStyles } from '../../styles/Projects.style';
import { getProjects } from '../../service/project.service';
import { defaultModules, defaultFrameworkComponents, defaultColDef, defaultGridOptions } from '../shared/grid/defaults';
import ProcessNameRenderer from '../shared/grid/cell-renderers/ProcessNameRenderer';
import ProjectActionsRenderer from '../shared/grid/cell-renderers/ProjectActionsRenderer';
import { userIDFormatter } from '../shared/grid/formatters';
import { updateAuth } from '../../state-management/actions/Auth.actions';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import Popup from '../shared/Popup';
import CreateProject from '../pages/CreateProject';
import Controls from '../controls/Controls';

function Projects() {

    const styles = projectsStyles();

    const [rowData, setRowData] = useState();
    const [gridApi, setGridApi] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const popUpState = useSelector(state => state.popUp);

    const getAllProjects = async () => {
        let { data, error } = await getProjects(user.token);
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
            cellRenderer: 'processNameRenderer'
        },
        {
            field: 'project.description',
            width: 300
        },
        {
            field: 'project.owner._id',
            headerName: 'Owner',
            valueFormatter: userIDFormatter,
        },
        {
            field: 'accessible',
            headerName: '',
            cellRenderer: 'projectActionsRenderer',
            filter: false,
            sortable: false
        }
    ], []);

    const frameworkComponents = {
        ...defaultFrameworkComponents,
        processNameRenderer: ProcessNameRenderer,
        projectActionsRenderer: ProjectActionsRenderer
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.showLoadingOverlay();
        getAllProjects();
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
                        Projects
                    </Typography>
                    <Controls.Button
                        text="Create Project"
                        endIcon={<AddCircleIcon />}
                        size="medium"
                        color="secondary"
                        disableElevation
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => dispatch(updatePopUpState({ createProject: true }))}
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
                title="Create New Project"
                fullWidth={true}
                openPopup={popUpState.createProject}
                onClose={() => dispatch(updatePopUpState({ createProject: false }))}
            >
                <CreateProject />
            </Popup>
        </>
    )
}

export default Projects;
