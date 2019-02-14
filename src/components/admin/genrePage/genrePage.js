import React from 'react';
import genreRequest from '../../../apiRequest/genre';
import authRequest from '../../../firebaseRequests/auth';

const defaultGenre = {
  genreName: '',
};

class genrePage extends React.Component {
  state = {
    genres: [],
    newGenre: defaultGenre,
    oldGenre: defaultGenre,
    showGenres: false,
    showEdit: 0,
  }

  componentDidMount = () => {
    genreRequest
      .getGenre()
      .then((genres) => {
        this.setState({genres});
      })
      .catch((err) => {
        console.error('error with gettign genres', err);
      });
  }

  // POST New Genre

  nameChange = (e) => {
    this.formFieldStringState('genreName', e);
  };

  formFieldStringState = (name, e) => {
    const tempGenre = {...this.state.newGenre};
    tempGenre[name] = e.target.value;
    this.setState({newGenre: tempGenre});
  }

  formSubmit = (e) => {
    const {newGenre} = this.state;
    newGenre.uid = authRequest.getUid();
    e.preventDefault();
    if (
      newGenre.genreName
    ) {
      this.postGenre(this.state.newGenre);
      this.setState({newGenre: defaultGenre});
    } else {
      alert('ugh');
    }
  }

  postGenre = () => {
    genreRequest
      .postGenre(this.state.newGenre)
      .then(() => {
        this.props.updateState();
        this.componentDidMount();
      });
  }

  // EDIT GENRE NAME

  changeNameClick = (id, genre) => {
    const showEditId = id * 1;
    this.setState({showEdit: showEditId});
    this.setState({oldGenre: genre});
  }

  editNameChange = (e) => {
    this.oldformFieldStringState('genreName', e);
  }

  oldformFieldStringState = (name, e) => {
    const tempGenre = {...this.state.oldGenre};
    tempGenre[name] = e.target.value;
    this.setState({oldGenre: tempGenre});
  }

  pressEnter = (e) => {
    const gId = e.target.id * 1;
    if (e.key === 'Enter') {
      this.editFormSubmit(gId);
    }
  }

  editFormSubmit = (gId) => {
    const {oldGenre} = this.state;
    oldGenre.uid = authRequest.getUid();
    // e.preventDefault();
    if (
      oldGenre.genreName
    ) {
      this.putRequest(gId, this.state.oldGenre);
      this.setState({oldGenre: defaultGenre});
      this.setState({showEdit: 0});
    } else {
      alert('ugh');
    }
  }

  putRequest = (id, update) => {
    genreRequest
      .putRequest(id, update)
      .then (() => {
        this.props.updateState();
        this.componentDidMount();
      })
      .catch((err) => {
        console.error('error with update request', err);
      });
  }

  showGenres = () => {
    this.setState({showGenres: true});
  }

  hideGenres = () => {
    this.setState({showGenres: false});
  }

  // DELETE GENRE

  deleteClick = (e) => {
    const genreToDelete = e.target.id;
    const artists = this.props.artistState;
    const genre = e.target.value;
    artists.forEach((artist) => {
      if (artist.genreName !== genre) {
        return (
          genreRequest
            .deleteRequest(genreToDelete)
            .then(() => {
              this.props.updateState();
              this.componentDidMount();
            })
            .catch((err) => {
              console.error('error with delete request', err);
            })
        );
      } else {
        return (
          alert("no can do cowboy, the artist: " + artist.name + " is using this genre")
        );
      }
    });
  }

  render () {

    const showGenres = this.state.showGenres;

    const buttonComponent = (genre) => {
      const showEdit = this.state.showEdit;
      if (showEdit !== genre.id) {
        return (
          <div>
            <h3 className="col-xs-9" id={genre.id} onClick={() => this.changeNameClick(genre.id, genre)}>{genre.genreName}</h3>
            <button type="button" className="btn btn-danger btn-sm glyphicon glyphicon-trash can" aria-hidden="true" value={genre.genreName} id={genre.id} onClick={this.deleteClick}></button>
          </div>
        );
      } else {
        return (
          <div className="col-sm-11">
            <input type="text" className="form-control gsInput" defaultValue={genre.genreName} id={genre.id} onChange={this.editNameChange} onKeyPress={this.pressEnter} aria-describedby="basic-addon1"/>
          </div>
        );
      }
    };

    const genreNameComponent = this.state.genres.map((genre) => {
      if (
        this.state.showGenres !== false
      ) {
        return (
          <div className="row" key={genre.id}>
            {buttonComponent(genre)}
          </div>
        );
      } else return null;
    });

    return (
      <div>
        <div className="col-sm-8 col-sm-offset-2 text-left">
          <h2 className="text-left">Add New Genre:</h2>
          <form className="row" onSubmit={this.formSubmit}>
            <fieldset className="col-xs-6">
              <label className="text-left" htmlFor="genreName">Genre Name:</label>
              <br />
              <input
                className="col-xs-12 "
                type="text"
                id="genreName"
                placeholder="Genre Name"
                value={this.state.newGenre.genreName}
                onChange={this.nameChange}
              />
            </fieldset>
            <div className="row col-xs-6">
              <button className="btn-success btn-lg">Submit Genre</button>
            </div>
          </form>
          {showGenres ? (
            <button className="btn btn-info" onClick={this.hideGenres}>Hide</button>
          ) : (
            <div className="col-xs-6 row">
              <button className="btn-danger btn-md" onClick={this.showGenres}>Delete/Edit A Genre</button>
            </div>) }
        </div>
        <div className="col-sm-8 col-sm-offset-2 text-left">
          {genreNameComponent}
        </div>
      </div>
    );
  }
}

export default genrePage;
