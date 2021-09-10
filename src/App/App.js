import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/private-theming';
import Header from '../component/Header';
import Background from './Background';
import { customTheme } from '../styles/theme';
import Notification from '../component/shared/Notification';
import PageContent from '../component/PageContent';

function App() {

  return (
    <div className="container">
      <Background />
      <div className="page-content">
        <ThemeProvider theme={customTheme}>
          <Router>
            <Switch>
              <Route exact path='/'>
                <Header />
                <PageContent />
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
