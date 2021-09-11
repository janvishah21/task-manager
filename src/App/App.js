import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/private-theming';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Background from './Background';
import { customTheme } from '../styles/theme';
import Notification from '../component/shared/Notification';
import PageContent from '../component/PageContent';

function App() {

  const loader = useSelector(state => state.loader);

  return (
    <div className="container">
      <Background />
      <div className="page-content">
        <ThemeProvider theme={customTheme}>
          <Router>
            <Switch>
              <Route exact path='/'>
                {
                  loader ? <LinearProgress color="secondary" className="loader" /> : ''
                }
                <div className="main-content">
                  <Header />
                  <PageContent />
                  <Footer />
                </div>
                <CssBaseline />
              </Route>
              <Route path='*'>
                Page Not Found
              </Route>
            </Switch>
          </Router>
          <Notification />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
