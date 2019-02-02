import React from 'react';

import artistRequest from '../../firebaseRequests/artists';
import './home.css';

class home extends React.Component {

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
        console.error('error with artist get request', err);
      });
  }

  render () {
    const artistComponent = this.state.artists.map((artist) => {
      return (
        <h1>{artist.name}</h1>
      );
    });
    return (
      <div className="home">
        <h1>Home</h1>
        <div>
          {artistComponent}
        </div>
      </div>
    );
  }
}

export default home;
