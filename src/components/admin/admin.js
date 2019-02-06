import React from 'react';
import './admin.css';
import artistRequest from '../../apiRequest/artists';
import GenreSelect from './GenreSelect';
import StageSelect from './StageSelect';
import genreRequest from '../../apiRequest/genre';

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
    genres: [],
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
  }

  postArtist = (e) => {
    e.preventDefault();
    artistRequest.postArtist(this.state.newArtist);
    this.componentDidMount();
  }

  formFieldStringState = (name, e) => {
    const tempArtist = {...this.state.newArtist};
    tempArtist[name] = e.target.value;
    this.setState({newArtist: tempArtist});
  }

  formFieldNumberState = (name, e) => {
    const tempArtist = {...this.state.newArtist};
    tempArtist[name] = e.target.value * 1;
    console.log('e.target.value', e.target.value);
    this.setState({newArtist: tempArtist});
  }

  nameChange = (e) => {
    this.formFieldStringState('name', e);
  };

  dayChange = (e) => {
    this.formFieldStringState('day', e);
  };

  genreChange = (e) => {
    console.log('e', e);
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
    const {onSubmit} = this.props;
    const {newArtist} = this.state;
    e.preventDefault();
    if (
      newArtist.name &&
      newArtist.day &&
      newArtist.genreName &&
      newArtist.stageName &&
      newArtist.description &&
      newArtist.imageLink
    ) {
      onSubmit(this.state.newArtist);
      this.setState({newArtist: defaultArtist});
    } else {
      alert('ugh');
    }

  }

  render () {
    const submitArtist = () => {
      console.log('you pressed button');
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

    const genreComponent = this.state.genres.map((genre) => {
      return (
        <GenreSelect
          details={genre}
          key={genre.id}
          type="number"
          value={genre.id}
          // onChange={this.genreChange}
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
                  <StageSelect
                    id="stage"
                    value={this.state.newArtist.stageName}
                    onChange={this.stageChange}
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
              <button className="btn-success btn-lg" onClick={() => submitArtist()}>Submit Artist</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default admin;
