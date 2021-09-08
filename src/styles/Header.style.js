import { makeStyles } from '@mui/styles';

export const headerStyles = makeStyles(() => ({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr max-content',
      zIndex: 3,
      color: 'white',
      userSelect: 'none',
      alignItems: 'center'
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