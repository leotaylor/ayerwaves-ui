import React from 'react';

class ArtistSelect extends React.Component {

  render () {
    const details = this.props;
    return (
      <option className="col-sm-6" value={details.details.id}>
        {details.details.name}
      </option>
    );
  }
}

export default ArtistSelect;
