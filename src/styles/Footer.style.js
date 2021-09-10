import { makeStyles } from '@mui/styles';

export const footerStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: '100%',
        position: 'fixed',
        bottom: '0',
        left: '0',
        textAlign: 'center',
        userSelect: 'none'
      },
      appInfo: {
          textAlign: 'left'
      },
      githubLogo: {
        color: 'white'
      },
      copyright: {
        textAlign: 'right'
      }
}));