import React from 'react';
import genreRequest from '../../apiRequest/genre';

class GenreSelect extends React.Component {
  state = {
    genres: [],
  }

  componentDidMount () {
    genreRequest
      .getGenre()
      .then((genres) => {
        this.setState({genres});
      })
      .catch((err) => {
        console.error('error with getting genres', err);
      });
  }
  render () {
    const genreComponent = this.state.genres.map((genre) => {
      return (
        <option className="col-sm-6" key={genre.id}>{genre.genreName}</option>
      );
    });
    return (
      <select className="col-sm-12">
        <option value=''>Genres</option>
        {genreComponent}
      </select>
    );
  }

}

export default GenreSelect;
