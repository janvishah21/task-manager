import { makeStyles } from '@mui/styles';

export const headerStyles = makeStyles(() => ({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr max-content',
      zIndex: 3,
      color: 'white',
      userSelect: 'none',
      alignItems: 'center',
      borderBottom: '1px solid grey',
      '&:hover': {
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      }
    },
    title: {
      cursor: 'pointer',
      textDecoration: 'none',
    },
    logo: {
      marginRight: '10px'
    },
    navItems: {
      textAlign: 'right',
      display: 'grid'
    },
    navItem: {
      color: '#ccc',
      padding: '0 10px',
      cursor: 'pointer',
      '&:hover': {
        color: 'white'
      },
    },
    avatar: {
      maxWidth: '30px',
      maxHeight: '30px',
      margin: '0 10px',
      borderRadius: '50%',
      cursor: 'pointer'
    },
    logout: {
      color: '#ccc',
      display: 'grid',
      gridTemplateColumns: 'max-content max-content',
      cursor: 'pointer',
      '&:hover': {
        color: 'white'
      },
    }
}));