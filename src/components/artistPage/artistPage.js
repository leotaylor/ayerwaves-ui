import React from 'react';
import './artistPage.css';
import artistRequest from '../../apiRequest/artists';

class artistPage extends React.Component {

  state = {
    singleArtists: [],
  }

  loadData () {
    const artistId = this.props.match.params.id;
    artistRequest
      .getSingleArtist(artistId)
      .then((res) => {
        this.setState({singleArtists: res});
      })
      .catch((err) => {
        console.error('error with getting artist', err);
      });
  }

  componentDidMount () {
    this.loadData();
  }

  componentDidUpdate () {
    this.loadData();
  }

  render () {
    const singleArtistComponent = this.state.singleArtists;

    return (
      <div className="artistPage">
        <h1>{singleArtistComponent.name}</h1>
        <img className="bandimage" alt="bandphoto" src={singleArtistComponent.imageLink}></img>
        <h3>Genre: {singleArtistComponent.genreName}</h3>
        <h4>{singleArtistComponent.description}</h4>
        <h3>Playing on: {singleArtistComponent.day}</h3>
        <h3>Stage: {singleArtistComponent.stageName}</h3>
      </div>
    );
  }
}

export default artistPage;
