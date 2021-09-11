import dayjs from 'dayjs';

export const userObjectFormatter = (params) => params.value.name ?? params.value._id.toUpperCase();

export const timeFormatter = (params) => dayjs(params.value).format('YYYY/DD/MM hh:mm A (Z)');