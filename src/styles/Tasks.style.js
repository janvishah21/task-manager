import { makeStyles } from '@mui/styles';

export const tasksStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        height: '80vh'
    },
    gridHeader: {
        display: 'grid',
        gridTemplateColumns: '1fr max-content',
        color: 'white',
        marginBottom: '15px',
    },
    projectKey: {
        fontSize: 16,
        paddingLeft: 4
    }
}));