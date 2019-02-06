import React from 'react';

class StageSelect extends React.Component {

  render () {
    const details = this.props;
    return (
      <option className="col-sm-6" value={details.details.id}>
        {details.details.stageName}
      </option>
    );
  }
}

export default StageSelect;
