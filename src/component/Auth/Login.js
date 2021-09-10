import { useDispatch } from 'react-redux';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { loginStyles } from '../../styles/Login.style';
import { FormUtil, Form } from '../shared/Formutil';
import { login } from '../../service/auth.service';
import { updateAuth } from '../../state-management/actions/Auth.actions';
import { updateLoginPopUpState, updateSignUpPopUpState } from '../../state-management/actions/AuthPopUp.actions';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

import Controls from '../controls/Controls';

function Login() {

    const styles = loginStyles();

    const dispatch = useDispatch();

    const validate = (fieldValues = values) => {
        // ignore
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = FormUtil(initialValues, true, validate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await login(values.email, values.password);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Welcome Back 😄',
                type: 'success'
            }));
            dispatch(updateAuth(data));
            dispatch(updateLoginPopUpState(false));
        } else if (error) {
            const notification = {
                isOpen: true,
                message: '',
                type: 'error'
            };
            if (error.status === 400)
                notification.message = 'Invalid Credentials, Please Try Again !';
            else
                notification.message = 'Internal Server Error 😕';
            dispatch(updateNotificationState({
                ...notification
            }));
        }
    }

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit} className={styles.loginForm}>
                <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    type="email"
                    autoFocus
                    onChange={handleInputChange}
                />
                <Controls.Input
                    label="Password"
                    name="password"
                    value={values.password}
                    type="password"
                    onChange={handleInputChange}
                />
                <Controls.Button
                    className={styles.submitBtn}
                    type="submit"
                    endIcon={<LoginIcon />}
                    text="Login" />
                <Typography
                    className={styles.goToSignUpLink}
                    onClick={() => {
                        dispatch(updateLoginPopUpState(false));
                        dispatch(updateSignUpPopUpState(true));
                    }}
                >Don't have an account ?</Typography>
            </Form>
        </div>
    )
}

const initialValues = {
    email: '',
    password: ''
}

export default Login;
