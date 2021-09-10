import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Typography from '@mui/material/Typography';
import { signUpStyles } from '../../styles/SignUp.style';
import { FormUtil, Form } from '../shared/Formutil';
import { signUp } from '../../service/auth.service';
import { updateAuth } from '../../state-management/actions/Auth.actions';
import { updateLoginPopUpState, updateSignUpPopUpState } from '../../state-management/actions/AuthPopUp.actions';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

import Controls from '../controls/Controls';

function SignUp() {

    const styles = signUpStyles();

    const dispatch = useDispatch();

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
        e.preventDefault();
        const user = {
            ...values
        };
        delete user.confirm_password;
        console.log('user', user);
        const { data, error } = await signUp(user);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Welcome 😁',
                type: 'success'
            }));
            dispatch(updateAuth(data));
            dispatch(updateSignUpPopUpState(false));
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
                <Controls.Button
                    className={styles.submitBtn}
                    type="submit"
                    endIcon={<PersonAddAlt1Icon />}
                    text="Sign Up" />
                <Typography
                    className={styles.goToLoginLink}
                    onClick={() => {
                        dispatch(updateSignUpPopUpState(false));
                        dispatch(updateLoginPopUpState(true));
                    }}
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
