import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { headerStyles } from '../styles/Header.style';
import Popup from './shared/Popup';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { updatePageContentState } from '../state-management/actions/PageContentState.actions';
import { updateAuth } from '../state-management/actions/Auth.actions';
import { updateLoginPopUpState, updateSignUpPopUpState } from '../state-management/actions/AuthPopUp.actions';
import { logout } from '../service/auth.service';

function Header({ notify, setNotify }) {

    const styles = headerStyles();

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    // const pageContentState = useSelector(state => state.pageContentState);
    const authPopUpState = useSelector(state => state.authPopUp);

    const handleLogout = async (all = false) => {
        // return dispatch(updateAuth({}));
        const { data, error } = await logout(user.token, all);

        if (data) {
            dispatch(updateAuth({}));
            setNotify({
                isOpen: true,
                message: 'Logged Out Successfully !',
                type: 'success'
            });
        } else if (error) {
            const notification = {
                isOpen: true,
                message: '',
                type: 'error'
            };
            if (error.status === 401)
                notification.message = 'Please Log In first :)';
            else
                notification.message = 'Internal Server Error !!!';
            setNotify({
                ...notification
            });
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
                {
                    user.token ? 
                        <>
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
                <Login 
                    notify={notify}
                    setNotify={setNotify}
                />
            </Popup>
            <Popup 
                title="Sign Up"
                fullWidth={true}
                showAppTitle={true}
                openPopup={authPopUpState.signUpPopUp}
                onClose={() => dispatch(updateSignUpPopUpState(false))}
            >
                <SignUp 
                    notify={notify}
                    setNotify={setNotify}
                />
            </Popup>
        </div>
    )
}

export default Header;
