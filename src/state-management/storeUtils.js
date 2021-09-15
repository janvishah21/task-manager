import store from '../store';
import { updateUsers } from './actions/Users.actions';
import { getUsersByIdList } from '../service/user.service';

export const getToken = () => store.getState().auth.token;

export const reloadUsersState = async (idList = []) => {
    const state = store.getState();

    const filteredIdList = idList.filter(id => !state.users[id]);

    const { data, error } = await getUsersByIdList(filteredIdList);

    const payload = {};

    if (!error && data) {
        data.forEach(user => payload[user._id] = user);
        store.dispatch(updateUsers(payload));
    }
}