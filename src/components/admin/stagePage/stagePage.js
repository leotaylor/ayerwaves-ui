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

  hideStages = () => {
    this.setState({showStages: false});
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

  // EDIT GENRE NAME

    changeNameClick = (id, stage) => {
      const showEditId = id * 1;
      this.setState({showEdit: showEditId});
      this.setState({oldStage: stage});
    }

    editNameChange = (e) => {
      this.oldformFieldStringState('stageName', e);
    }

    oldformFieldStringState = (name, e) => {
      const tempStage = {...this.state.oldStage};
      tempStage[name] = e.target.value;
      this.setState({oldStage: tempStage});
    }

    pressEnter = (e) => {
      const gId = e.target.id * 1;
      if (e.key === 'Enter') {
        this.editFormSubmit(gId);
      }
    }

    editFormSubmit = (gId) => {
      const {oldStage} = this.state;
      oldStage.uid = authRequest.getUid();
      if (
        oldStage.stageName
      ) {
        this.putRequest(gId, this.state.oldStage);
        this.setState({oldStage: defaultStage});
        this.setState({showEdit: 0});
      } else {
        alert('ugh');
      }
    }

    putRequest = (id, update) => {
      stageRequest
        .putStage(id, update)
        .then (() => {
          this.props.updateState();
        })
        .catch((err) => {
          console.error('error with update request', err);
        });
    }

    // DELETE GENRE

    deleteClick = (e) => {
      const stageToDelete = e.target.id;
      const artists = this.props.artistState;
      const stage = e.target.value;
      artists.forEach((artist) => {
        if (artist.stageName !== stage) {
          return (
            stageRequest
              .deleteStage(stageToDelete)
              .then(() => {
                this.props.updateState();
              })
              .catch((err) => {
                console.error('error with delete request', err);
              })
          );
        } else {
          return (
            alert("no can do cowboy, the artist: " + artist.name + " is using this stage")
          );
        }
      });
    }

    render () {
      // const {details} = this.props;
      const showStages = this.state.showStages;

      const buttonComponent = (stage) => {
        const showEdit = this.state.showEdit;
        if (showEdit !== stage.id) {
          return (
            <div>
              <h3 className="col-xs-9" id={stage.id} onClick={() => this.changeNameClick(stage.id, stage)}>{stage.stageName}</h3>
              <button type="button" className="btn btn-danger btn-sm glyphicon glyphicon-trash can" aria-hidden="true" value={stage.stageName} id={stage.id} onClick={this.deleteClick}></button>
            </div>
          );
        } else {
          return (
            <div className="col-sm-11">
              <input type="text" defaultValue={stage.stageName} className="form-control gsInput" id={stage.id} onChange={this.editNameChange} onKeyPress={this.pressEnter} aria-describedby="basic-addon1"/>
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
            </div>
          );
        } else return null;
      });

      return (
        <div>
          <div className="col-sm-8 col-sm-offset-2 text-left">
            <h2 className="text-left">Add New Stage:</h2>
            <form className="row" onSubmit={this.formSubmit}>
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
            {showStages ? (
              <button className="btn btn-info" onClick={this.hideStages}>Hide</button>
            ) : (
              <div className="col-xs-6 row">
                <button className="btn-danger btn-md" onClick={this.showStages}>Delete/Edit A Stage</button>
              </div>) }
          </div>
          <div className="col-sm-8 col-sm-offset-2 text-left">
            {stageNameComponent}
          </div>
        </div>
      );
    }
}

export default stagePage;
