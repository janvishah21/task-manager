import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { createAccessRequestStyles } from '../../styles/CreateAccessRequest.style';
import { FormUtil, Form } from '../shared/Formutil';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { createProject } from '../../service/project.service';
import Controls from '../controls/Controls';

function CreateAccessRequest() {

    const styles = createAccessRequestStyles();

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

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
        // const { data, error } = await createProject(user.token, values);
        // if (data) {
        //     dispatch(updateNotificationState({
        //         isOpen: true,
        //         message: 'New Project Created !',
        //         type: 'success'
        //     }));
        // } else if (error?.status === 409) {
        //     dispatch(updateNotificationState({
        //         isOpen: true,
        //         message: 'Project Key Already Taken !',
        //         type: 'error'
        //     }));
        // } else if (error) {
        //     dispatch(updateNotificationState({
        //         isOpen: true,
        //         message: 'Internal Server Error 😕',
        //         type: 'error'
        //     }));
        // }
        setLoading(false);
    }

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Controls.Input
                    label="Request Description"
                    name="description"
                    multiline
                    rows={3}
                    value={values.description}
                    onChange={handleInputChange}
                />
                <LoadingButton
                    className={styles.submitBtn}
                    type="submit"
                    loading={loading}
                    variant="contained"
                >
                    Submit
                </LoadingButton>
            </Form>
        </div>
    )
}

const initialValues = {
    description: '',
    accessRequestedFor: '',
    project: ''
}

export default CreateAccessRequest;
