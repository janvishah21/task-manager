import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { popupStyles } from '../../styles/Popup.style';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function Popup({ title, children, openPopup, onClose, showAppTitle = false, showCloseBtn = false, fullWidth = false, dividers = false }) {

    const styles = popupStyles();

    return (
        <Dialog 
            open={openPopup}
            fullWidth={fullWidth}
            maxWidth="sm"
            TransitionComponent={Transition}
            classes={{ paper: styles.dialogWrapper }}
            onClose={onClose}
        >
            {
                showAppTitle ? 
                    <>
                        <span className={styles.titleContainer}>
                            <TaskAltOutlinedIcon 
                                sx={{ fontSize: 64 }}
                                className={styles.titleLogo}
                                color="secondary"
                            />
                            <Typography 
                                variant="h5"
                                fontWeight="fontWeightBold"
                                fontSize="h5.fontSize"
                            >
                                Task Manager
                            </Typography>
                        </span>
                    </> : ''
            }
            <DialogTitle className={styles.dialogTitle}>
                <div className={styles.title}>
                    <Typography variant="h5" fontWeight="bold">
                        {title}
                    </Typography>
                    {
                        showCloseBtn ?
                            <IconButton
                                color="secondary"
                                onClick={onClose}>
                                <CloseIcon />
                            </IconButton> : ''
                    }
                </div>
            </DialogTitle>
            <DialogContent dividers={dividers}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup
