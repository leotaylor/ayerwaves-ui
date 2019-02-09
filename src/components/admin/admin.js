import React from 'react';
import './admin.css';
import artistRequest from '../../apiRequest/artists';
import GenreSelect from './GenreSelect';
import StageSelect from './StageSelect';
import genreRequest from '../../apiRequest/genre';
import stageRequest from '../../apiRequest/stage';
import authRequest from '../../firebaseRequests/auth';
// import {Modal} from 'react-bootstrap';
import GenrePage from '../admin/genrePage/genrePage';

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
    // editArtist: defaultArtist,
    genres: [],
    stages: [],
    showArtistEdit: 0,
    // show: false,
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
  }

  updateState = () => {
    this.componentDidMount();
  };

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

  editformSubmit = (e) => {
    const {newArtist} = this.state;
    newArtist.uid = authRequest.getUid();
    const aId = e.target.id * 1;
    e.preventDefault();
    if (
      newArtist.name &&
      newArtist.day &&
      newArtist.genreName &&
      newArtist.stageName &&
      newArtist.description &&
      newArtist.imageLink
    ) {
      this.putArtist(aId, this.state.newArtist);
      this.setState({newArtist: defaultArtist});
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

  // edit artist
  editArtist = (e) => {
    const showEditId = e.target.id * 1;
    this.setState({showArtistEdit: showEditId});
  }

  // constructor (props, context) {
  //   super(props, context);

  //   this.handleShow = this.handleShow.bind(this);
  //   this.handleClose = this.handleClose.bind(this);
  // }

  // handleShow () {
  //   this.setState({ show: true });
  // }

  // handleClose () {
  //   this.setState({ show: false });
  // }

  // editArtist = (id) => {
  //   console.log(id);
  // }

  // addGenreItem = (genreToAdd) => {
  //   this.state.genres.push(genreToAdd);
  //   this.setState({genres: this.state.genres});
  // }

  render () {

    const artistComponent = this.state.artists.map((artist) => {
      const showArtist = this.state.showArtistEdit;
      if (showArtist !== artist.id) {
        return (
          <div className="row" key={artist.id}>
            <p className="col-sm-6" id={artist.id} onClick={this.editArtist}>{artist.name}</p>
            <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash" aria-hidden="true" id={artist.id} onClick={this.deleteClick}>
            </button>
            {/* <button type="button" className="btn btn-success btn-xs glyphicon glyphicon-pencil" aria-hidden="true" id={artist.id} onClick={this.handleShow}>
            </button> */}
          </div>
        );
      } else return (
        <div className="col-xs-8 col-xs-offset-2">
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
                  placeholder={artist.name}
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
                  placeholder={artist.day}
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
                  placeholder={artist.imageLink}
                  value={this.state.newArtist.imageLink}
                  onChange={this.imageChange}
                />
              </fieldset>
            </div>
            <button className="btn-success btn-lg">Submit Changes</button>
          </form>
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
          <div className="row">
            <GenrePage
              updateState={this.updateState}
              artistState={this.state.artists}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default admin;
