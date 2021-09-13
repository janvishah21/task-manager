import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { createProjectStyles } from '../../styles/CreateProject.style';
import { FormUtil, Form } from '../shared/Formutil';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { createProject } from '../../service/project.service';
import Controls from '../controls/Controls';

function CreateProject() {

    const styles = createProjectStyles();

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
        const { data, error } = await createProject(user.token, values);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'New Project Created !',
                type: 'success'
            }));
        } else if (error?.status === 409) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Project Key Already Taken !',
                type: 'error'
            }));
        } else if (error) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Internal Server Error 😕',
                type: 'error'
            }));
        }
        setLoading(false);
    }

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Controls.Input
                    label="Project Key"
                    name="_id"
                    value={values._id}
                    autoFocus
                    onChange={handleInputChange}
                />
                <Controls.Input
                    label="Project Name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                />
                <Controls.Input
                    label="Project Description"
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
    _id: '',
    name: '',
    description: ''
}

export default CreateProject;
