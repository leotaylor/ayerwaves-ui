import React from 'react';
import './admin.css';
import artistRequest from '../../apiRequest/artists';
import GenreSelect from './GenreSelect';

class admin extends React.Component {
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
    const goToArtistField = () => {
      this.props.history.push('/artistField');
    };

    const editArtist = (id) => {
      console.log(id);
    };

    const artistComponent = this.state.artists.map((artist) => {
      return (
        <div className="row" key={artist.id}>
          <p className="col-sm-6" onClick={(() => editArtist(artist))}>{artist.name}</p>
          <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash" aria-hidden="true">
          </button>
        </div>
      );
    });

    return (
      <div className="admin">
        <h1>Admin</h1>
        <div className="col-sm-6 text-left">
          <h1>Artists</h1>
          <h4>(Click name to edit)</h4>
          {artistComponent}
        </div>

        <div className="col-sm-6">
          <div className="col-xs-8 col-xs-offset-2">
            <h2 className="text-center">Add NEW Artist:</h2>
            <form onSubmit={this.formSubmit}>
              <div className="row">
                <fieldset className="col-xs-6">
                  <label className="text-left" htmlFor="name">Name:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="name"
                    placeholder="Artist Name"
                    // value={newListing.address}
                    // onChange={this.addressChange}
                  />
                </fieldset>

                <fieldset className="col-xs-6">
                  <label htmlFor="day">Day</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="day"
                    placeholder="Friday"
                    // value={newListing.squareFootage}
                    // onChange={this.squareFootageChange}
                  />
                </fieldset>

              </div>
              <div className="row">
                <fieldset className="col-xs-6">
                  <label htmlFor="genre">Genre:</label>
                  <br />
                  {/* <input
                    // className="col-xs-12"
                    // type="text"
                    // id="genre"
                    // placeholder="Make a dropdown"
                    // value={newListing.city}
                    // onChange={this.cityChange}
                  />  */}
                  <GenreSelect/>
                </fieldset>
                <fieldset className="col-xs-6">
                  <label htmlFor="stage">Stage:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="stage"
                    placeholder="make a dropdown"
                    // value={newListing.state}
                    // onChange={this.stateChange}
                  />
                </fieldset>

              </div>

              <div className="row">
                <fieldset className="col-xs-6">
                  <label htmlFor="description">Description:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="description"
                    placeholder="Lovely one bedroom house"
                    // value={newListing.description}
                    // onChange={this.descriptionChange}
                  />
                </fieldset>

                <fieldset className="col-xs-6">
                  <label htmlFor="imageUrl">Image Url:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="imageUrl"
                    placeholder="http://www.google.com"
                    // value={newListing.imageUrl}
                    // onChange={this.imageUrlChange}
                  />
                </fieldset>
              </div>
              <button className="btn-success btn-lg" onClick={() => goToArtistField()}>Submit Artist</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default admin;
