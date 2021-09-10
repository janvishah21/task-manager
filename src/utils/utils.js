import dayjs from 'dayjs';

export const getCurrentYear = () => {
    return dayjs().year();
}