import { useSelector } from 'react-redux';
import { pageContentStyles } from '../styles/PageContent.style';
import Projects from './Data/Projects';

function PageContent() {

    const styles = pageContentStyles();

    const pageContentState = useSelector(state => state.pageContentState);
    const user = useSelector(state => state.auth);

    return (
        <div className={styles.root}>
            {
                user.token ? 
                    {
                        'projects': <Projects />
                    }[pageContentState] 
                    : ''
            }
        </div>
    )
}

export default PageContent;
