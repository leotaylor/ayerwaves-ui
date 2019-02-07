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

  postGenre = (e) => {
    genreRequest
      .postGenre(this.state.newGenre)
      .then(() => {
        this.componentDidMount();
      });
  }
  render () {
    // const genreNameComponent = this.state.genres.map((genre) => {
    //   return (
    //     <div className="row" key={genre.id}>
    //       <h3>{genre.genreName}</h3>
    //     </div>
    //   );
    // });

    return (
      <div>
        {/* <div className="col-sm-6 text-left">
          {genreNameComponent}
        </div> */}
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
      </div>
    );
  }
}

export default genrePage;
