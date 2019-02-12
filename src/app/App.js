import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';
import './App.css';

import Login from '../components/Login/Login';
import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Admin from '../components/admin/admin';
import ArtistPage from '../components/artistPage/artistPage';

import fbConnection from '../firebaseRequests/connection';

fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/admin', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  logout = () => {
    this.setState({authed: false});
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              logout={this.logout}
              component={Navbar}
            />
            {/* <Route
              authed={this.state.authed}
              logout={this.logout}
              component={Navbar}
            /> */}
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/' exact component={Home} />
                  <PrivateRoute
                    path='/admin'
                    authed={this.state.authed}
                    component={Admin}
                  />
                  <PublicRoute
                    path="/login"
                    authed={this.state.authed}
                    component={Login}
                  />
                  <PublicRoute
                    path="/home"
                    authed={this.state.authed}
                    component={Home}
                  />
                  <PublicRoute
                    path="/artist/:id"
                    authed={this.state.authed}
                    component={ArtistPage}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
