import React from 'react';
import './admin.css';
import artistRequest from '../../apiRequest/artists';
import GenreSelect from './GenreSelect';
import StageSelect from './StageSelect';
import genreRequest from '../../apiRequest/genre';
import stageRequest from '../../apiRequest/stage';
import vendorRequest from '../../apiRequest/vendor';
import authRequest from '../../firebaseRequests/auth';
import GenrePage from '../admin/genrePage/genrePage';
import StagePage from '../admin/stagePage/stagePage';
import VendorPage from '../admin/vendorPage/vendorPage';

const defaultArtist = {
  name: '',
  day: '',
  genreName: 0,
  stageName: 0,
  description: '',
  imageLink: '',
};

class admin extends React.Component {

  state = {
    artists: [],
    newArtist: defaultArtist,
    editArtist: defaultArtist,
    genres: [],
    stages: [],
    showArtistEdit: 0,
    vendors: [],
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
    genreRequest
      .getGenre()
      .then((genres) => {
        this.setState({genres});
      })
      .catch((err) => {
        console.error('error with gettign genres', err);
      });
    stageRequest
      .getStage()
      .then((stages) => {
        this.setState({stages});
      })
      .catch((err) => {
        console.error('error with getting genres', err);
      });
    vendorRequest
      .getRequest()
      .then((vendors) => {
        this.setState({vendors});
        console.log(this.state.vendors);
      })
      .catch((err) => {
        console.error('errror with getting vendors', err);
      });
  }

  updateState = () => {
    this.componentDidMount();
  };

  // POST New Artists

  postArtist = (e) => {
    artistRequest
      .postArtist(this.state.newArtist)
      .then(() => {
        this.componentDidMount();
      });
  }

  formFieldStringState = (name, e) => {
    const tempArtist = {...this.state.newArtist};
    tempArtist[name] = e.target.value;
    this.setState({newArtist: tempArtist});
  }

  formFieldNumberState = (name, e) => {
    const tempArtist = {...this.state.newArtist};
    tempArtist[name] = e.target.value * 1;
    this.setState({newArtist: tempArtist});
  }

  nameChange = (e) => {
    this.formFieldStringState('name', e);
  };

  dayChange = (e) => {
    this.formFieldStringState('day', e);
  };

  genreChange = (e) => {
    this.formFieldNumberState('genreName', e);
  };

  stageChange = (e) => {
    this.formFieldNumberState('stageName', e);
  };

  descChange = (e) => {
    this.formFieldStringState('description', e);
  };

  imageChange = (e) => {
    this.formFieldStringState('imageLink', e);
  };

  formSubmit = (e) => {
    const {newArtist} = this.state;
    newArtist.uid = authRequest.getUid();
    e.preventDefault();
    if (
      newArtist.name &&
      newArtist.day &&
      newArtist.genreName &&
      newArtist.stageName &&
      newArtist.description &&
      newArtist.imageLink
    ) {
      this.postArtist(this.state.newArtist);
      this.setState({newArtist: defaultArtist});
    } else {
      alert('ugh');
    }
  }

  // Edit Artists

  editArtist = (id, artist) => {
    const showEditId = id * 1;
    this.setState({showArtistEdit: showEditId});
    this.setState({editArtist: artist});
  }

  hideArtists = () => {
    this.setState({showArtistEdit: 0});
    this.setState({editArtist: defaultArtist});
  }

  editformSubmit = (e) => {
    const {editArtist} = this.state;
    editArtist.uid = authRequest.getUid();
    const aId = e.target.id * 1;
    e.preventDefault();
    if (
      editArtist.name &&
      editArtist.day &&
      editArtist.genreName &&
      editArtist.stageName &&
      editArtist.description &&
      editArtist.imageLink
    ) {
      this.putArtist(aId, this.state.editArtist);
      this.setState({editArtist: defaultArtist});
      this.setState({showArtistEdit: 0});
    } else {
      alert('ugh');
    }
  }

  putArtist = (id, update) => {
    artistRequest
      .putRequest(id, update)
      .then (() => {
        this.componentDidMount();
      })
      .catch((err) => {
        console.error('error with update request', err);
      });
  }

  editFormFieldStringState = (name, e) => {
    const tempArtist = {...this.state.editArtist};
    tempArtist[name] = e.target.value;
    this.setState({editArtist: tempArtist});
  }

  editFormFieldNumberState = (name, e) => {
    const tempArtist = {...this.state.editArtist};
    tempArtist[name] = e.target.value * 1;
    this.setState({editArtist: tempArtist});
  }

  editNameChange = (e) => {
    this.editFormFieldStringState('name', e);
  };

  editDayChange = (e) => {
    this.editFormFieldStringState('day', e);
  };

  editGenreChange = (e) => {
    this.editFormFieldNumberState('genreName', e);
  };

  editStageChange = (e) => {
    this.editFormFieldNumberState('stageName', e);
  };

  editDescChange = (e) => {
    this.editFormFieldStringState('description', e);
  };

  editImageChange = (e) => {
    this.editFormFieldStringState('imageLink', e);
  };

  // Delete Artists

  deleteClick = (e) => {
    const artistToDelete = e.target.id;
    artistRequest
      .deleteRequest(artistToDelete)
      .then(() => {
        this.componentDidMount();
      })
      .catch((err) => {
        console.error('error with delete request', err);
      });
  }

  render () {

    const artistComponent = this.state.artists.map((artist) => {
      const showArtist = this.state.showArtistEdit;
      if (showArtist !== artist.id) {
        return (
          <div className="row" key={artist.id}>
            <p className="col-sm-6" id={artist.id} onClick={() => this.editArtist(artist.id, artist)}>{artist.name}</p>
            <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash" aria-hidden="true" id={artist.id} onClick={this.deleteClick}></button>
          </div>
        );
      } else return (
        <div className="row" key={artist.id}>
          <div className="col-xs-8">
            <h2 className="text-center">Edit Artist:</h2>
            <form id={artist.id} onSubmit={this.editformSubmit}>
              <div className="row">
                <fieldset className="col-xs-6">
                  <label className="text-left" htmlFor="name">Name:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="name"
                    defaultValue={artist.name}
                    onChange={this.editNameChange}
                  />
                </fieldset>

                <fieldset className="col-xs-6">
                  <label htmlFor="day">Day</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="day"
                    defaultValue={artist.day}
                    onChange={this.editDayChange}
                  />
                </fieldset>

              </div>
              <div className="row">
                <fieldset className="col-xs-6">
                  <label htmlFor="genre">Genre:</label>
                  <br />
                  <select className="col-sm-12" onChange={this.editGenreChange}>
                    <option>Genres</option>
                    {this.state.genres.map((genre) => {
                      return (
                        <GenreSelect
                          details={genre}
                          key={genre.id}
                          type="number"
                          value={genre.id}
                        />
                      );
                    })}
                  </select>
                </fieldset>
                <fieldset className="col-xs-6">
                  <label htmlFor="stage">Stage:</label>
                  <br />
                  <select className="col-sm-12" onChange={this.editStageChange}>
                    <option>Stage</option>
                    {this.state.stages.map((stage) => {
                      return (
                        <StageSelect
                          details={stage}
                          key={stage.id}
                          type="number"
                          value={stage.id}
                        />
                      );
                    })}
                  </select>
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
                    defaultValue={artist.description}
                    onChange={this.editDescChange}
                  />
                </fieldset>

                <fieldset className="col-xs-6">
                  <label htmlFor="imageUrl">Image Url:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="imageUrl"
                    onChange={this.editImageChange}
                    defaultValue={artist.imageLink}
                  />
                </fieldset>
              </div>
              <div className="text-center">
                <button className="btn-success btn-lg">Submit Changes</button>
              </div>
            </form>
          </div>
          <button className="btn btn-info" onClick={this.hideArtists}>Hide</button>
        </div>
      );
    });

    const genreComponent = this.state.genres.map((genre) => {
      return (
        <GenreSelect
          details={genre}
          key={genre.id}
          type="number"
          value={genre.id}
        />
      );
    });

    const stageComponent = this.state.stages.map((stage) => {
      return (
        <StageSelect
          details={stage}
          key={stage.id}
          type="number"
          value={stage.id}
        />
      );
    });

    return (
      <div className="admin col-sm-12">
        <h1>Welcome Ayerwaves Admin</h1>
        <div className="col-sm-4 text-left">
          <h1>Artists</h1>
          <h4>(Click name to edit)</h4>
          {artistComponent}
        </div>

        <div className="col-sm-4">
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
                    value={this.state.newArtist.name}
                    onChange={this.nameChange}
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
                    value={this.state.newArtist.day}
                    onChange={this.dayChange}
                  />
                </fieldset>

              </div>
              <div className="row">
                <fieldset className="col-xs-6">
                  <label htmlFor="genre">Genre:</label>
                  <br />
                  <select className="col-sm-12" onChange={this.genreChange}>
                    <option>Genres</option>
                    {genreComponent}
                  </select>
                </fieldset>
                <fieldset className="col-xs-6">
                  <label htmlFor="stage">Stage:</label>
                  <br />
                  <select className="col-sm-12" onChange={this.stageChange}>
                    <option>Stage</option>
                    {stageComponent}
                  </select>
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
                    placeholder="Description..."
                    value={this.state.newArtist.description}
                    onChange={this.descChange}
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
                    value={this.state.newArtist.imageLink}
                    onChange={this.imageChange}
                  />
                </fieldset>
              </div>
              <button className="btn-success btn-lg">Submit Artist</button>
            </form>
          </div>

        </div>
        <div className="col-sm-4">
          <div className="row">
            <GenrePage
              updateState={this.updateState}
              artistState={this.state.artists}
            />
          </div>
          <div className="row">
            <StagePage
              details={this.state.stages}
              updateState={this.updateState}
              artistState={this.state.artists}
            />
          </div>
        </div>
        <div className="row">
          <VendorPage
            details={this.state.vendors}
          />
        </div>
      </div>
    );
  }
}

export default admin;
