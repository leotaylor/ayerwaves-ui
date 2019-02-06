import React from 'react';
// import genreRequest from '../../apiRequest/genre';

class GenreSelect extends React.Component {

  render () {
    const details = this.props;
    return (
      <option className="col-sm-6" value={details.details.id}>
        {details.details.genreName}
      </option>
    );
  }
}

export default GenreSelect;
