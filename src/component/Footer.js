import Toolbar from '@mui/material/Toolbar';
import { AppBar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import { footerStyles } from '../styles/Footer.style';
import { GITHUB_REPO_URL } from '../utils/const';
import { getCurrentYear } from '../utils/utils';

function Footer() {

    const styles = footerStyles();

    return (
        <div className={styles.root}>
            <AppBar position="static" color="secondary">
                <Toolbar 
                    className={styles.title}
                >
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography className={styles.appInfo}>
                                Developed by Janvi Shah
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Link href={GITHUB_REPO_URL} target="_blank">
                                <GitHubIcon fontSize="medium" className={styles.githubLogo}/>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={styles.copyright}>
                                © Copyright {getCurrentYear()}. All rights reserved.
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Footer;
