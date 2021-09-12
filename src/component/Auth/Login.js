import { useDispatch } from 'react-redux';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { loginStyles } from '../../styles/Login.style';
import { FormUtil, Form } from '../shared/Formutil';
import { login } from '../../service/user.service';
import { updateAuth } from '../../state-management/actions/Auth.actions';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

import Controls from '../controls/Controls';

function Login() {

    const styles = loginStyles();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        e.preventDefault();
        const { data, error } = await login(values.email, values.password);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Welcome Back 😄',
                type: 'success'
            }));
            dispatch(updateAuth(data));
            dispatch(updatePopUpState({ login: false }));
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
        setLoading(false);
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
                <LoadingButton
                    className={styles.submitBtn}
                    type="submit"
                    endIcon={<LoginIcon />}
                    loading={loading}
                    variant="contained"
                >
                    Log In
                </LoadingButton>
                <Typography
                    className={styles.goToSignUpLink}
                    onClick={() => dispatch(updatePopUpState({
                        login: false,
                        signUp: true
                    }))}
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
