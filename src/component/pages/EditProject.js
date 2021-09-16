import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { editProjectStyles } from '../../styles/EditProject.style';
import { FormUtil, Form } from '../shared/Formutil';
import { updateProjectDetails } from '../../service/project.service';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';

import Controls from '../controls/Controls';

function EditProject({ project, cb }) {

    const styles = editProjectStyles();

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

    useEffect(() => {
        setValues({
            ...project
        });
    }, [project]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { data, error } = await updateProjectDetails(project._id, values);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Project Details Updated !',
                type: 'success'
            }));
        } else if (error) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Internal Server Error 😕',
                type: 'error'
            }));
        }
        setLoading(false);
        cb();
        dispatch(updatePopUpState({ editProject: undefined }));
    }

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Controls.Input
                    label="Project Name"
                    name="name"
                    value={values.name}
                    autoFocus
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
                    endIcon={<SaveOutlinedIcon />}
                    loading={loading}
                    variant="contained"
                >
                    Save
                </LoadingButton>
            </Form>
        </div>
    )
}

const initialValues = {
    name: '',
    description: ''
}

export default EditProject;
