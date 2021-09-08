import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { notificationStyles } from '../../styles/Notification.style';

function Notification({ notify, setNotify }) {

    const classes = notificationStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type.length > 0 ? notify.type : 'info'}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
