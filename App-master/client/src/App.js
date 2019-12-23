import React, {Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/routing/PrivateRouter'
import Posts from './components/posts/Post';
import Alert from './components/layout/Alert';

//REDUX
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

return(
<Provider store = { store }>  
  <Router>
    <Fragment>
        <NavBar />
        <Route exact path = '/' component = {Landing} />
        <section className = "container">
          <Alert/>
          <Switch>
            <Route exact path = "/register" component = { Register } />
            <Route exact path = "/login" component = { Login } />
            <PrivateRoute exact path='/dashboard' component = { Dashboard }/>
            <PrivateRoute exact path='/posts' component = { Posts } />
          </Switch>
        </section>
    </Fragment>
  </Router>
</Provider>
)};

export default App;
