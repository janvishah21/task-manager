import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AgGridReact } from 'ag-grid-react';
import { projectsStyles } from '../../styles/Projects.style';
import { getProjects } from '../../service/project.service';
import TimeRenderer from '../shared/grid/cell-renderers/TimeRenderer';
import ProcessNameRenderer from '../shared/grid/cell-renderers/ProcessNameRenderer';
import ProjectActionsRenderer from '../shared/grid/cell-renderers/ProjectActionsRenderer';
import { userObjectFormatter } from '../shared/grid/formatters';
import { updateAuth } from '../../state-management/actions/Auth.actions';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import Popup from '../shared/Popup';
import CreateProject from '../pages/CreateProject';
import Controls from '../controls/Controls';

function Projects() {

    const styles = projectsStyles();

    const [rowData, setRowData] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const popUpState = useSelector(state => state.popUp);

    useEffect(() => {
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
        getAllProjects();
    }, []);

    const modules = useMemo( ()=> [
        ClientSideRowModelModule, 
        RangeSelectionModule, 
        RowGroupingModule, 
        RichSelectModule], []);

    const frameworkComponents = {
        timeRenderer: TimeRenderer,
        processNameRenderer: ProcessNameRenderer,
        projectActionsRenderer: ProjectActionsRenderer
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
            headerName: 'Project Key'
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
            field: 'project.owner',
            headerName: 'Owner',
            valueFormatter: userObjectFormatter
        },
        {
            field: 'accessible',
            headerName: '',
            cellRenderer: 'projectActionsRenderer'
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
