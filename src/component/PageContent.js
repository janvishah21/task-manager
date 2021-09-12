import { useSelector } from 'react-redux';
import { pageContentStyles } from '../styles/PageContent.style';
import Projects from './Data/Projects';
import Tasks from './Data/Tasks';
import AccessRequests from './Data/AccessRequests';

function PageContent() {

    const styles = pageContentStyles();

    const pageContentState = useSelector(state => state.pageContentState);
    const user = useSelector(state => state.auth);

    return (
        <div className={styles.root}>
            {
                user.token ? 
                    {
                        'projects': <Projects />,
                        'access-requests': <AccessRequests />,
                        'tasks': <Tasks />
                    }[pageContentState.page]
                    : ''
            }
        </div>
    )
}

export default PageContent;
