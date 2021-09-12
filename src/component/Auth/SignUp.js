import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { signUpStyles } from '../../styles/SignUp.style';
import { FormUtil, Form } from '../shared/Formutil';
import { signUp } from '../../service/user.service';
import { updateAuth } from '../../state-management/actions/Auth.actions';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

import Controls from '../controls/Controls';

function SignUp() {

    const styles = signUpStyles();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('confirm_password' in fieldValues) {
            temp.confirm_password = values.password !== fieldValues.confirm_password ? 'Password does not match' : '';
        }
        
        setErrors({
            ...temp
        });

        if (fieldValues === values)
            return Object.values(temp).every(x => x === '');
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
        const user = {
            ...values
        };
        delete user.confirm_password;
        const { data, error } = await signUp(user);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Welcome 😁',
                type: 'success'
            }));
            dispatch(updateAuth(data));
            dispatch(updatePopUpState({ signUp: false }));
        } else if (error) {
            const notification = {
                isOpen: true,
                message: '',
                type: 'error'
            };
            if (error.status === 400)
                notification.message = 'Sign Up Failed !';
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
            <Form onSubmit={handleSubmit} className={styles.signUpForm}>
            <Controls.Input
                    label="Name"
                    name="name"
                    value={values.name}
                    autoFocus
                    onChange={handleInputChange}
                />
                <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    type="email"
                    onChange={handleInputChange}
                />
                <Controls.Input
                    label="Password"
                    name="password"
                    value={values.password}
                    type="password"
                    onChange={handleInputChange}
                />
                <Controls.Input
                    label="Confirm Password"
                    name="confirm_password"
                    value={values.confirm_password}
                    type="password"
                    onChange={handleInputChange}
                    error={errors.confirm_password}
                />
                <Controls.Input
                    label="Age"
                    name="age"
                    value={values.age}
                    type="number"
                    min="10"
                    onChange={handleInputChange}
                />
                <LoadingButton
                    className={styles.submitBtn}
                    type="submit"
                    endIcon={<PersonAddAlt1Icon />}
                    loading={loading}
                    variant="contained"
                >
                    Sign Up
                </LoadingButton>
                <Typography
                    className={styles.goToLoginLink}
                    onClick={() => dispatch(updatePopUpState({
                        login: true,
                        signUp: false
                    }))}
                >Already have an account ?</Typography>
            </Form>
        </div>
    )
}

const initialValues = {
    email: '',
    password: '',
    confirm_password: '',
    name: '',
    age: 24
}

export default SignUp;
