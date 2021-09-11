import dayjs from 'dayjs';

export const userObjectFormatter = (params) => params.value.name ?? params.value._id.toUpperCase();

export const userIDFormatter = (params) => params.value.toUpperCase();

export const timeFormatter = (params) => dayjs(params.value).format('YYYY/DD/MM hh:mm A (Z)');

export const requestStatusFormatter = (params) => {
    const request = params.data;
    if (!request.open) return 'Closed';
    else if (request.approved) return 'Approved';
    else return 'Pending';
}