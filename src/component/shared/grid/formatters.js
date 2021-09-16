import dayjs from 'dayjs';
import store from '../../../store';

export const userIDFormatter = (params) => {
    const user = store.getState().users[params.value.toLowerCase()];
    return user?.name ? `${user.name} ${user?._id ? '(' + user._id.toUpperCase() + ')' : ''}` : params.value.toUpperCase();
}

export const timeFormatter = (params) => dayjs(params.value).format('YYYY/DD/MM hh:mm A (Z)');
