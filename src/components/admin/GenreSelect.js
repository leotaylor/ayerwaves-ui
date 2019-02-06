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
    const details = this.props;
    return (
      <option className="col-sm-6" value={details.details.id}>
        {details.details.genreName}
      </option>
    );
  }
}

export default GenreSelect;
