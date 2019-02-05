import React from 'react';
import stageRequest from '../../apiRequest/stage';

class StageSelect extends React.Component {
  state = {
    stages: [],
  }

  componentDidMount () {
    stageRequest
      .getStage()
      .then((stages) => {
        this.setState({stages});
      })
      .catch((err) => {
        console.error('error with getting genres', err);
      });
  }
  render () {
    const stageComponent = this.state.stages.map((stage) => {
      return (
        <option className="col-sm-6" key={stage.id}>{stage.stageName}</option>
      );
    });
    return (
      <select className="col-sm-12">
        <option value=''>Stages</option>
        {stageComponent}
      </select>
    );
  }

}

export default StageSelect;
