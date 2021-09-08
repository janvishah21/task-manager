import { makeStyles } from '@mui/styles';

export const signUpStyles = makeStyles(() => ({
    signUpForm: {
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridAutoFlow: 'row',
        gridGap: '20px',
    },
    goToLoginLink: {
        color: 'blue',
        cursor: 'pointer'
    }
}));