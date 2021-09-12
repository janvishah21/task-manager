import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { raiseAccessRequest } from '../../../../service/access-request.service';
import { updateNotificationState } from '../../../../state-management/actions/Notification.actions';

function ProjectActionsRenderer(params) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const user = useSelector(state => state.auth);

    const requestAccess = async (project) => {
        setLoading(true);
        const { data, error } = await raiseAccessRequest(project._id, user.user._id, user.token);
        if (error) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Internal Server Error 😕',
                type: 'error'
            }));
        } else {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Access Request raised successfully !',
                type: 'success'
            }));
        }
        setLoading(false);
    }

    const handleEdit = () => {}

    return (
        <>
            {
                user.user._id === params.data.project.owner._id ? 
                    <Tooltip
                        title="Edit Project Details"
                        arrow
                    >
                        <IconButton
                            onClick={() => handleEdit()}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip> : ''
            }
            {
                !params.value ?
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        variant="contained"
                        size="small"
                        onClick={() => requestAccess(params.data.project)}
                    >
                        Request Access
                    </LoadingButton>
                    : ''
            }
        </>
    )
}

export default ProjectActionsRenderer;
