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
    version: {
      color: '#80ffff',
      padding: '0 20px'
    },
    iconBtn: {
      color: 'white'
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
    },
    underDevelopment: {
      textAlign: 'center',
      textTransform: 'uppercase',
      background: `repeating-linear-gradient(
        40deg,
        rgba(255, 255, 0, .4),
        rgba(255, 255, 0, .4) 10px,
        rgba(0, 0, 0, .3) 10px,
        rgba(0, 0, 0, .3) 20px
      )`
    }
}));