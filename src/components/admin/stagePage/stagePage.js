import React from 'react';
import stageRequest from '../../../apiRequest/stage';
import authRequest from '../../../firebaseRequests/auth';

const defaultStage = {
  stageName: '',
};

class stagePage extends React.Component {
  state = {
    newStage: defaultStage,
    oldStage: defaultStage,
    showStages: false,
    showEdit: 0,
  }

  showStages = () => {
    this.setState({showStages: true});
  }

  // POST New Stage

  nameChange = (e) => {
    this.formFieldStringState('stageName', e);
  };

  formFieldStringState = (name, e) => {
    const tempStage = {...this.state.newStage};
    tempStage[name] = e.target.value;
    this.setState({newStage: tempStage});
  }

  formSubmit = (e) => {
    const {newStage} = this.state;
    newStage.uid = authRequest.getUid();
    e.preventDefault();
    if (
      newStage.stageName
    ) {
      this.postStage(this.state.newStage);
      this.setState({newStage: defaultStage});
    } else {
      alert('ugh');
    }
  }

  postStage = () => {
    stageRequest
      .postStage(this.state.newStage)
      .then(() => {
        this.props.updateState();
      });
  }

  render () {
    // const {details} = this.props;

    const buttonComponent = (stage) => {
      const showEdit = this.state.showEdit;
      if (showEdit !== stage.id) {
        return (
          <h3 id={stage.id} onClick={this.changeNameClick}>{stage.stageName}</h3>
        );
      } else {
        return (
          <div>
            <input type="text" className="form-control" id={stage.id} onChange={this.editNameChange} onKeyPress={this.pressEnter} placeholder="Rename" aria-describedby="basic-addon1"/>
          </div>
        );
      }
    };

    const stageNameComponent = this.props.details.map((stage) => {
      if (
        this.state.showStages !== false
      ) {
        return (
          <div className="row" key={stage.id}>
            {buttonComponent(stage)}
            <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash" aria-hidden="true" value={stage.stageName} id={stage.id} onClick={this.deleteClick}></button>
          </div>
        );
      } else return null;
    });

    return (
      <div>
        <div className="col-sm-10 text-left">
          <h2 className="text-center">Add NEW Stage:</h2>
          <form onSubmit={this.formSubmit}>
            <fieldset className="col-xs-6">
              <label className="text-left" htmlFor="stageName">Stage Name:</label>
              <br />
              <input
                className="col-xs-12"
                type="text"
                id="stageName"
                placeholder="Stage Name"
                value={this.state.newStage.stageName}
                onChange={this.nameChange}
              />
            </fieldset>
            <div className="row col-xs-6">
              <button className="btn-success btn-lg">Submit Stage</button>
            </div>
          </form>
        </div>
        <button className="btn-danger btn-lg" onClick={this.showStages}>Delete/Edit A Stage</button>
        <div className="col-sm-6 text-left">
          {stageNameComponent}
        </div>
      </div>
    );
  }
}

export default stagePage;
