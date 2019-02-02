import React, { Component } from 'react';
import Login from '../components/Login/Login';
import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Admin from '../components/admin/admin';

import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navbar />
        <Login />
        <Home />
        <Admin />
      </div>
    );
  }
}

export default App;
