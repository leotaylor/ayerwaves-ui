import React from 'react';

import './Login.css';

import authRequests from '../../firebaseRequests/auth';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  loginClickEvent = (e) => {
    const {user} = this.state;
    e.preventDefault();
    authRequests.loginUser(user)
      .then(() => {
        this.props.history.push('/admin');
      })
      .catch((err) => {
        console.error('error with login', err);
      });
  };

  emailChange = (e) => {
    const tempUser = {...this.state.user};
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  };

  passwordChange = (e) => {
    const tempUser = {...this.state.user};
    tempUser.password = e.target.value;
    this.setState({user: tempUser});
  };
  render () {
    const {user} = this.state;
    return (
      <div className="Login">
        <div id="login-form">
          <h1 className="text-center">Login</h1>
          <form className="form-horizontal col-sm-4 col-sm-offset-4">
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-2 control-label">Email</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-2 control-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
