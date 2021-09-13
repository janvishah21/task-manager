import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { editAccessRequestStyles } from '../../styles/EditAccessRequest.style';
import { FormUtil, Form } from '../shared/Formutil';
import { updateAccessRequest } from '../../service/access-request.service';
import { getUsers } from '../../service/user.service';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

import Controls from '../controls/Controls';

function EditAccessRequest({ request }) {

    const styles = editAccessRequestStyles();

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);

    const [optionsOpen, setOptionsOpen] = useState(false);
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
        setValues({
            ...request
        });
    }, [request]);

    useEffect(() => {
        let active = true;

        if (!optionsLoading)
            return undefined;

        (async () => {
            const { data, error } = await getUsers(user.token);

            if (!error && data) {
                if (active) {
                    setUsers(data);
                }
            }
        })();

        return () => {
            active = false;
        }
    }, [optionsLoading]);

    useEffect(() => {
        if (!optionsOpen)
            setUsers([]);
    }, [optionsOpen]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { data, error } = await updateAccessRequest(request._id, values, user.token);
        if (data) {
            dispatch(updateNotificationState({
                isOpen: true,
                message: 'Access Request Updated !',
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

    const handleOptionChange = e => {
        console.log(e.target.innerHTML);
    }

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Autocomplete
                    open={optionsOpen}
                    onOpen={() => setOptionsOpen(true)}
                    onClose={() => setOptionsOpen(false)}
                    value={values.accessRequestedFor}
                    onChange={handleOptionChange} // TODO
                    options={users}
                    loading={optionsLoading}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={option => `${option.name} (${option._id.toUpperCase()})`}
                    renderInput={(params) => 
                        <Controls.Input
                            label="Requested For"
                            name="accessRequestedFor"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        { optionsLoading ? <CircularProgress color="inherit" size={20} /> : null }
                                        { params.InputProps.endAdornment }
                                    </>
                                )
                            }}
                            {...params}
                        />
                    }
                />
                
                <Controls.Input
                    label="Request Details"
                    name="description"
                    multiline
                    rows={2}
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
    description: '',
    accessRequestedFor: {
        _id: '',
        name: ''
    }
}

export default EditAccessRequest;
