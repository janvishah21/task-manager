import { makeStyles } from '@mui/styles';

export const popupStyles = makeStyles(theme => ({
    titleContainer: {
        textAlign: 'center',
        padding: '20px 0',
        borderBottom: '1px dotted violet',
        userSelect: 'none'
    },
    dialogWrapper: {
        padding: theme.spacing(2)
    },
    dialogTitle: {
        verticalAlign: 'middle',
    },
    title: {
        display: 'grid',
        gridTemplateColumns: '1fr max-content'
    }
}));