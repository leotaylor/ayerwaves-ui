import React from 'react';
import './artistPage.css';
import artistRequest from '../../apiRequest/artists';

class artistPage extends React.Component {

  state = {
    singleArtists: [],
  }

  componentDidMount () {
    const artistId = this.props.match.params.id;
    artistRequest
      .getSingleArtist(artistId)
      .then((res) => {
        this.setState({singleArtists: res});
        console.log("test", this.state.singleArtists);
      })
      .catch((err) => {
        console.error('error with getting artist', err);
      });
  }

  render () {
    const singleArtistComponent = this.state.singleArtists;

    return (
      <div className="artistPage">
        <h1>ArtistPage</h1>
        <div>
          <h1>{singleArtistComponent.name}</h1>
        </div>
      </div>
    );
  }
}

export default artistPage;
