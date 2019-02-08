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
    showGenres: false,
  }

  componentDidMount = () => {
    genreRequest
      .getGenre()
      .then((genres) => {
        genres.forEach(genres => {
          genres.showEdit = '';
        });
        this.setState({genres});
      })
      .catch((err) => {
        console.error('error with gettign genres', err);
      });
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

  formFieldStringState = (name, e) => {
    const tempGenre = {...this.state.newGenre};
    tempGenre[name] = e.target.value;
    this.setState({newGenre: tempGenre});
  }

  nameChange = (e) => {
    this.formFieldStringState('genreName', e);
  };

  postGenre = () => {
    genreRequest
      .postGenre(this.state.newGenre)
      .then(() => {
        this.props.updateState();
        this.componentDidMount();
      });
  }

  showGenres = () => {
    this.setState({showGenres: true});
  }

  showEdit = (e) => {
    const tempGenre = [...this.state.genres];
    tempGenre.showEdit = e.target.id;
    console.log(tempGenre.showEdit);
    this.setState({ genres: tempGenre });
  }

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
    // const buttonComp = this.state.genres.map((genre) => {
    //   const artists = this.props.artistState;
    //   artists.forEach((artist) => {
    //     if (artist.genreName === genre.genreName) {
    //       return (
    //         <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash" aria-hidden="true" value={genre.genreName} id={genre.id} onClick={this.deleteClick}disabled></button>
    //       );
    //     } else {
    //       return (
    //         <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash" aria-hidden="true" value={genre.genreName} id={genre.id} onClick={this.deleteClick}></button>
    //       );
    //     }
    //   });
    // });

    const genreNameComponent = this.state.genres.map((genre) => {
      if (
        this.state.showGenres !== false
      ) {
        return (
          <div className="row" key={genre.id}>
            <h3>{genre.genreName}</h3>
            <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash" aria-hidden="true" value={genre.genreName} id={genre.id} onClick={this.deleteClick}></button>
            <button type="button" className="btn btn-success btn-xs glyphicon glyphicon-pencil" aria-hidden="true" value={genre.genreName} id={genre.id} onClick={this.showEdit}></button>
          </div>
        );
      } else return null;
    });

    return (
      <div>
        <div className="col-sm-10 text-left">
          <h2 className="text-center">Add NEW Genre:</h2>
          <form onSubmit={this.formSubmit}>
            <fieldset className="col-xs-6">
              <label className="text-left" htmlFor="genreName">Genre Name:</label>
              <br />
              <input
                className="col-xs-12"
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
        </div>
        <button className="btn-danger btn-lg" onClick={this.showGenres}>Delete/Edit a Genre</button>
        <div className="col-sm-6 text-left">
          {genreNameComponent}
          {/* {buttonComp} */}
        </div>
      </div>
    );
  }
}

export default genrePage;
