import React from 'react';
import {Link} from 'react-router-dom';
import artistRequest from '../../apiRequest/artists';
// import { NavDropdown } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import './navbar.css';

import authRequests from '../../firebaseRequests/auth';
import ArtistSelect from '../navbar/artistSelect/ArtistSelect';

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

  singleArtist = (e) => {
    const Aid = e.target.value * 1;
    this.props.history.push(`/artist/${Aid}`);
  };

  render () {
    const {authed, logout} = this.props;
    const logoutClickEvent = (e) => {
      authRequests.logoutUser();
      logout();
    };

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
              <Link to="/" className="navbar-brand" onClick={logoutClickEvent}>Ayerwaves</Link>
            </div>
            {
              authed ? (
                <ul className="nav navbar-nav navbar-right">
                  <li className="navbar-form">
                    <button onClick={logoutClickEvent} className="btn btn-danger">Logout</button>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav navbar-right top">
                  <li className='dropdown'>
                    {/* <Link to={this.singleArtist}> */}
                    <select className='select' onChange={this.singleArtist}>
                      <option>Artists</option>
                      {artistComponent}
                    </select>
                    {/* </Link> */}
                  </li>
                  {/* <li>
                    <li className="dropdown">
                      <button className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">VENDORS <span class="caret"></span></button>
                      <ul className="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                      </ul>
                    </li>
                  </li> */}
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

export default withRouter(Navbar);
