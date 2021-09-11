import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { notificationStyles } from '../../styles/Notification.style';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

function Notification() {

    const styles = notificationStyles();

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
            className={styles.root}
            open={notify.isOpen}
            autoHideDuration={8000}
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
