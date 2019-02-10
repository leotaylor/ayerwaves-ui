import React from 'react';
import {Link} from 'react-router-dom';
import artistRequest from '../../apiRequest/artists';
// import { NavDropdown } from 'react-bootstrap';

import './navbar.css';

import authRequests from '../../firebaseRequests/auth';
import ArtistSelect from '../navbar/artistSelect/ArtistSelect';

// import createHistory from 'history/createBrowserHistory';

class Navbar extends React.Component {

  state = {
    artists: [],
  }

  componentDidMount () {
    artistRequest
      .getRequest()
      .then((artists) => {
        this.setState({artists});
      })
      .catch((err) => {
        console.error('error with getting artist', err);
      });
  }

  // singleArtist = (e) => {
  //   const Aid = e.target.value * 1;
  //   history.push(`/artist/${Aid}`);
  // };

  singleArtist = (e) => {
    const Aid = e.target.value * 1;
    this.props.history.push(`/artist/${Aid}`);
    console.log(Aid);
    console.log(this.props.history);
  };

  render () {
    const {authed, logout} = this.props;
    const logoutClickEvent = (e) => {
      authRequests.logoutUser();
      logout();
    };

    // const artistComponent = this.state.artists.map((artist) => {
    //   return (
    //     <option key={artist.id} value={artist.id} onChange={() => singleArtist(artist.id)}>{artist.name}</option>
    //   );
    // });

    const artistComponent = this.state.artists.map((artist) => {
      return (
        <ArtistSelect
          details={artist}
          key={artist.id}
          type="text"
          value={artist.id}
          id={artist.id}
          // onChange={this.singleArtist}
        />
      );
    });

    return (
      <div className="Navbar">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Ayerwaves</Link>
            </div>
            {
              authed ? (
                <ul className="nav navbar-nav navbar-right">
                  <li className="navbar-form">
                    <button onClick={logoutClickEvent} className="btn btn-danger">Logout</button>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <select onChange={this.singleArtist}>
                      <option>Artists</option>
                      {artistComponent}
                    </select>
                  </li>
                  <li>
                    <Link to="/admin">Admin</Link>
                  </li>
                </ul>
              )
            }
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
// export const history = createHistory();
