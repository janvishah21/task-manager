import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
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

    return (
        <>
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
