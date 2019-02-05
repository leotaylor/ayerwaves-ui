import React from 'react';
import './home.css';
import artistRequest from '../../apiRequest/artists';

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
        console.error('error with getting artist', err);
      });
  }

  render () {

    const singleArtist = (id) => {
      this.props.history.push(`/artist/${id}`);
    };

    const artistComponent = this.state.artists.map((artist) => {
      return (
        <button className="btn-danger" key={artist.id} value={artist.id} onClick={() => singleArtist(artist.id)}>{artist.name}</button>
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
