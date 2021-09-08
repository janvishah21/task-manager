import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { notificationStyles } from '../../styles/Notification.style';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

function Notification() {

    const classes = notificationStyles();

    const dispatch = useDispatch();
    const notify = useSelector(state => state.notification);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(updateNotificationState({
            ...notify,
            isOpen: false
        }));
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
