import './App.css';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/private-theming';
import Header from '../component/Header';
import Background from './Background';
import { customTheme } from '../styles/theme';
import Notification from '../component/shared/Notification';

function App() {

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  return (
    <div className="container">
      <Background />
      <div className="page-content">
        <ThemeProvider theme={customTheme}>
          <Router>
            <Switch>
              <Route exact path='/'>
                <Header 
                  notify={notify}
                  setNotify={setNotify}
                />
                Hiii
                <CssBaseline />
              </Route>
              <Route path='*'>
                Page Not Found
              </Route>
            </Switch>
          </Router>
          <Notification
            notify={notify}
            setNotify={setNotify}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
