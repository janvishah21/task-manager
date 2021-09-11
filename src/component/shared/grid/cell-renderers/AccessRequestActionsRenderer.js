import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { updateAccessRequest } from '../../../../service/access-request.service';
import { accessRequestActionsRendererStyles } from '../../../../styles/AccessRequestActionsRenderer.style';
import { updateNotificationState } from '../../../../state-management/actions/Notification.actions';

const colors = {
    approve: 'green',
    reject: 'red',
    delete: 'grey'
}

function AccessRequestActionsRenderer(params) {

    const styles = accessRequestActionsRendererStyles();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState({
        state: false,
        color: 'green'
    });

    const user = useSelector(state => state.auth);

    const handleAction = async (action) => {
        setLoading({
            state: true,
            color: colors[action]
        });
        let update = {};
        switch(action) {
            case 'approve':
                update = {
                    open: false,
                    approved: true
                };
                break;
            case 'reject': 
                update = {
                    open: false,
                    approved: false
                };
                break;
            case 'close': 
                update = {
                    open: false
                };
                break;
            default:
                update = {};
        }
        const { data, error } = await updateAccessRequest(params.data._id, update, user.token);
        if (error) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Action Failed, Please Try Again !',
                type: 'error'
            }));
        } else {
            dispatch(updateNotificationState({
                isOpen: true,
                message: `Request ${action}ed successfully !`,
                type: 'success'
            }));
        }
        setLoading({
            ...loading,
            state: false
        });
    }

    return (
        <div className={styles.root}>
            {
                !loading.state ?
                    <>
                        <Tooltip
                            title="Approve"
                            arrow
                        >
                            <IconButton
                                onClick={() => handleAction('approve')}
                            >
                                <TaskAltIcon 
                                    style={{ color: colors.approve }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Reject"
                            arrow
                        >
                            <IconButton
                                onClick={() => handleAction('reject')}
                            >
                                <CancelOutlinedIcon 
                                    style={{ color: colors.reject }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Close"
                            arrow
                        >
                            <IconButton
                                onClick={() => handleAction('close')}
                            >
                                <DeleteOutlinedIcon 
                                    style={{ color: colors.close }}
                                />
                            </IconButton>
                        </Tooltip>
                    </>
                    : <CircularProgress 
                        size={20}
                        style={{ color: loading.color}}
                        className={styles.circularProgress}
                        />
            }
        </div>
    )
}

export default AccessRequestActionsRenderer;
