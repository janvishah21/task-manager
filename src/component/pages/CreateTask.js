import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { createTaskStyles } from '../../styles/CreateTask.style';
import { FormUtil, Form } from '../shared/Formutil';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { createTask } from '../../service/task.service';
import { getUsers } from '../../service/user.service';
import { updatePopUpState } from '../../state-management/actions/PopUp.actions';
import Controls from '../controls/Controls';

function CreateTask({ projectId, cb }) {

    const styles = createTaskStyles();

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);

    const [optionsOpen, setOptionsOpen] = useState(false);
    const [inputFieldValue, setInputFieldValue] = useState('');
    const [users, setUsers] = useState([]);
    const optionsLoading = optionsOpen && users.length === 0;

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
        let active = true;

        if (!optionsLoading && inputFieldValue === '')
            return undefined;

        (async () => {
            const { data, error } = await getUsers(inputFieldValue);

            if (!error && data) {
                if (active) {
                    setUsers(data);
                }
            }
        })();

        return () => {
            active = false;
        }
    }, [optionsLoading, inputFieldValue]);

    useEffect(() => {
        if (!optionsOpen)
            setUsers([]);
    }, [optionsOpen]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { data, error } = await createTask(projectId, values);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'New Task Created !',
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
        dispatch(updatePopUpState({ createTask: false }));
    }

    const handleOptionChange = (e, newVal) => {
        setValues({
            ...values,
            assignee: newVal?._id || ''
        });
    }

    const handleInputFieldChange = (e, newVal) => {
        setInputFieldValue(newVal);
        setValues({
            ...values,
            assignee: newVal
        });
    }

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Controls.Input
                    label="Title"
                    name="title"
                    value={values._id}
                    autoFocus
                    onChange={handleInputChange}
                />
                <Controls.Input
                    label="Task Description"
                    name="description"
                    multiline
                    rows={3}
                    value={values.description}
                    onChange={handleInputChange}
                />
                <Autocomplete
                    open={optionsOpen}
                    onOpen={() => setOptionsOpen(true)}
                    onClose={() => setOptionsOpen(false)}
                    onChange={handleOptionChange}
                    inputValue={inputFieldValue}
                    onInputChange={handleInputFieldChange}
                    options={users}
                    loading={optionsLoading}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={option => `${option.name} (${option._id.toUpperCase()})`}
                    renderInput={(params) => 
                        <Controls.Input
                            label="Assignee"
                            name="assignee"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        { optionsLoading ? <CircularProgress size={20} /> : null }
                                        { params.InputProps.endAdornment }
                                    </>
                                )
                            }}
                            {...params}
                        />
                    }
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
    title: '',
    description: '',
    assignee: '',
    // attachment: '' // TODO
}

export default CreateTask;
