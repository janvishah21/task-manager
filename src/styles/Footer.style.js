import { makeStyles } from '@mui/styles';

export const footerStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxHeight: '50px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    textAlign: 'center',
    userSelect: 'none'
  },
  appInfo: {
    textAlign: 'left'
  },
  authorName: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: '4px'
  },
  githubLogo: {
    color: 'white'
  },
  copyright: {
    textAlign: 'right'
  }
}));