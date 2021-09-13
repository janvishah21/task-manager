import { makeStyles } from '@mui/styles';

export const accessRequestsStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        height: '70vh'
    },
    gridHeader: {
        display: 'grid',
        gridTemplateColumns: '1fr max-content',
        color: 'white',
        marginBottom: '15px'
    }
}));