import { makeStyles } from '@mui/styles';

export const editProjectStyles = makeStyles(() => ({
    loginForm: {
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridAutoFlow: 'row',
        gridGap: '20px',
    },
    goToSignUpLink: {
        color: 'blue',
        cursor: 'pointer'
    }
}));