import { useSelector } from 'react-redux';
import { pageContentStyles } from '../styles/PageContent.style';
import Projects from './Data/Projects';
import ReceivedAccessRequests from './Data/ReceivedAccessRequests';

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
                        'received-access-requests': <ReceivedAccessRequests />
                    }[pageContentState] 
                    : ''
            }
        </div>
    )
}

export default PageContent;
