import React from 'react';
// import genreRequest from '../../apiRequest/genre';

class GenreSelect extends React.Component {
  // state = {
  //   genres: [],
  // }

  // componentDidMount () {
  //   genreRequest
  //     .getGenre()
  //     .then((genres) => {
  //       this.setState({genres});
  //     })
  //     .catch((err) => {
  //       console.error('error with getting genres', err);
  //     });
  // }
  render () {
    // const genreComponent = this.state.genres.map((genre) => {
    //   return (
    //     <option
    //       className="col-sm-6"
    //       value={genre.id}
    //       key={genre.id}>
    //       {genre.genreName}
    //     </option>
    //   );
    // });
    const {details} = this.props;
    return (
      <select className="col-sm-12">
        <option value=''>Genres</option>
        <option className="col-sm-6">
          {details.genreName}
        </option>
      </select>
    );
  }
}

export default GenreSelect;
