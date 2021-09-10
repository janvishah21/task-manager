import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import Zoom from '@mui/material/Zoom';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { headerStyles } from '../styles/Header.style';
import Popup from './shared/Popup';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { updatePageContentState } from '../state-management/actions/PageContentState.actions';
import { updateAuth } from '../state-management/actions/Auth.actions';
import { updateLoginPopUpState, updateSignUpPopUpState } from '../state-management/actions/AuthPopUp.actions';
import { logout, getAvatar } from '../service/auth.service';
import { updateNotificationState } from '../state-management/actions/Notification.actions';

function Header() {

    const styles = headerStyles();

    const [profileAvatar, setProfileAvatar] = useState();
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const authPopUpState = useSelector(state => state.authPopUp);

    useEffect(() => {
        const getMyAvatar = async () => {
            if (user && user.user) {
                const { data, error } = await getAvatar(user.user._id, user.token);
                if (!error) {
                    try {
                        setProfileAvatar(URL.createObjectURL(data));
                    } catch (e) {
                        // ignore
                    }
                }
            }
        }
        getMyAvatar();
    }, [user]);

    const getFirstLetter = (name) => name && name.length ? name.toUpperCase()[0] : '';

    const handleLogout = async (all = false) => {
        // return dispatch(updateAuth({}));
        const { data, error } = await logout(user.token, all);

        if (data) {
            dispatch(updateAuth({}));
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'See You Soon 🙂',
                type: 'success'
            }));
        } else if (error) {
            const notification = {
                isOpen: true,
                message: '',
                type: 'error'
            };
            if (error.status === 401)
                notification.message = 'You Need to Log In first 🙂';
            else
                notification.message = 'Internal Server Error 😕';
            dispatch(updateNotificationState({
                ...notification
            }));
        }
    }

    return (
        <div className={styles.root}>
            <Toolbar 
                className={styles.title}
                onClick={() => dispatch(updatePageContentState('projects'))}
            >
                <TaskAltOutlinedIcon fontSize="large" className={styles.logo}/>
                <Typography 
                    variant="h5"
                    fontWeight="fontWeightBold"
                    fontSize="h5.fontSize"
                >
                    Task Manager
                </Typography>
            </Toolbar>
            <Toolbar className={styles.navItems}>
                <Tooltip 
                    title="Release Version"
                >
                    <Typography
                        className={styles.version}
                    >v1.1</Typography>
                </Tooltip>
                {
                    user.token ? 
                        <>
                            <Tooltip 
                                title={`${user.user.name}`}
                                TransitionComponent={Zoom}
                                arrow
                                leaveDelay={400}
                            >
                                {
                                    profileAvatar ? 
                                        <img src={profileAvatar} className={styles.avatar}/> : 
                                        <Avatar className={styles.avatar} sx={{ bgcolor: deepOrange[500] }}>{getFirstLetter(user.user.name)}</Avatar>
                                }
                            </Tooltip>
                            <span 
                                className={styles.logout}
                                onClick={() => handleLogout()}
                            >
                                <Typography 
                                    className={styles.navItem}
                                    fontWeight="fontWeightBold"
                                >
                                    Log Out
                                </Typography>
                                <LogoutIcon />
                            </span>
                        </>
                    :   <>
                            <Typography 
                                className={styles.navItem}
                                fontWeight="fontWeightBold"
                                onClick={() => dispatch(updateLoginPopUpState(true))}
                            >
                                Log In
                            </Typography>
                            <Typography 
                                className={styles.navItem}
                                fontWeight="fontWeightBold"
                                onClick={() => dispatch(updateSignUpPopUpState(true))}
                            >
                                Sign Up
                            </Typography>
                        </>
                }
            </Toolbar>
            <Popup 
                title="Log In"
                fullWidth={true}
                showAppTitle={true}
                openPopup={authPopUpState.loginPopUp}
                onClose={() => dispatch(updateLoginPopUpState(false))}
            >
                <Login />
            </Popup>
            <Popup 
                title="Sign Up"
                fullWidth={true}
                showAppTitle={true}
                openPopup={authPopUpState.signUpPopUp}
                onClose={() => dispatch(updateSignUpPopUpState(false))}
            >
                <SignUp />
            </Popup>
        </div>
    )
}

export default Header;
