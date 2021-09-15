import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { createAccessRequestStyles } from '../../styles/CreateAccessRequest.style';
import { FormUtil, Form } from '../shared/Formutil';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';
import { raiseAccessRequest } from '../../service/access-request.service';
import { getProjects } from '../../service/project.service';
import Controls from '../controls/Controls';
import { getUsers } from '../../service/user.service';
import { USER_LABEL_REGEX, PROJECT_LABEL_REGEX } from '../../utils/const';

function CreateAccessRequest() {

    const styles = createAccessRequestStyles();

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);

    const [optionsOpen, setOptionsOpen] = useState({
        requestor: false,
        project: false
    });
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const optionsLoading = {
        requestor: optionsOpen.requestor && users.length === 0,
        project: optionsOpen.project && projects.length === 0
    };

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

        if (!optionsLoading.requestor)
            return undefined;

        (async () => {
            const { data, error } = await getUsers();

            if (!error && data) {
                if (active) {
                    setUsers(data);
                }
            }
        })();

        return () => {
            active = false;
        }
    }, [optionsLoading.requestor]);

    useEffect(() => {
        if (!optionsOpen.requestor)
            setUsers([]);
    }, [optionsOpen.requestor]);

    useEffect(() => {
        let active = true;

        if (!optionsLoading.project)
            return undefined;

        (async () => {
            const { data, error } = await getProjects();

            if (!error && data) {
                if (active) {
                    setProjects(data.filter(project => project.accessible));
                }
            }
        })();

        return () => {
            active = false;
        }
    }, [optionsLoading.project]);

    useEffect(() => {
        if (!optionsOpen.project)
            setProjects([]);
    }, [optionsOpen.project]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(values);
        const { data, error } = await raiseAccessRequest(values);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'New Access Request Raised !',
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
    }

    const handleRequestorChange = e => {
        const label = e.target.innerHTML.toLowerCase();
        const matches = label.match(USER_LABEL_REGEX);
        if (matches.length === 3)
            setValues({
                ...values,
                accessRequestedFor: matches[2]
            });
    }

    const handleProjectChange = e => {
        const label = e.target.innerHTML.toLowerCase();
        const matches = label.match(PROJECT_LABEL_REGEX);
        if (matches.length === 3)
            setValues({
                ...values,
                project: matches[2]
            });
    }

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Autocomplete
                    open={optionsOpen.requestor}
                    onOpen={() => setOptionsOpen({ ...optionsOpen, requestor: true})}
                    onClose={() => setOptionsOpen({ ...optionsOpen, requestor: false})}
                    onChange={handleRequestorChange}
                    options={users}
                    loading={optionsLoading.requestor}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={option => `${option.name} (${option._id.toUpperCase()})`}
                    renderInput={(params) => 
                        <Controls.Input
                            label="Requesting For"
                            name="accessRequestedFor"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        { optionsLoading.requestor ? <CircularProgress size={20} /> : null }
                                        { params.InputProps.endAdornment }
                                    </>
                                )
                            }}
                            {...params}
                        />
                    }
                />
                <Autocomplete
                    open={optionsOpen.project}
                    onOpen={() => setOptionsOpen({ ...optionsOpen, project: true})}
                    onClose={() => setOptionsOpen({ ...optionsOpen, project: false})}
                    onChange={handleProjectChange}
                    options={projects}
                    loading={optionsLoading.project}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={option => `${option.project.name} (${option.project._id})`}
                    renderInput={(params) => 
                        <Controls.Input
                            label="For Project"
                            name="accessRequestedFor"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        { optionsLoading.project ? <CircularProgress size={20} /> : null }
                                        { params.InputProps.endAdornment }
                                    </>
                                )
                            }}
                            {...params}
                        />
                    }
                />
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
