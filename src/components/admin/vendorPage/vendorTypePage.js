import React from 'react';
import vendorTypeRequest from '../../../apiRequest/vendorType';
import authRequest from '../../../firebaseRequests/auth';

const defaultVendorType = {
  vendorType: '',
};

class vendorTypePage extends React.Component {

  state = {
    vendorTypes: [],
    newVendorType: defaultVendorType,
    oldVendorType: defaultVendorType,
    showEdit: 0,
    showVts: false,
  }

  componentDidMount = () => {
    vendorTypeRequest
      .getRequest()
      .then((vendorTypes) => {
        this.setState({vendorTypes});
      })
      .catch((err) => {
        console.error('error with getting vendortypes', err);
      });
  }

  // Post VendorType
  nameChange = (e) => {
    this.formFieldStringState('vendorType', e);
  }

  formFieldStringState = (name, e) => {
    const tempVT = {...this.state.newVendorType};
    tempVT[name] = e.target.value;
    this.setState({newVendorType: tempVT});
  }

  formSubmit = (e) => {
    const {newVendorType} = this.state;
    newVendorType.uid = authRequest.getUid();
    e.preventDefault();
    if (
      newVendorType.vendorType
    ) {
      this.postVT(this.state.newVendorType);
      this.setState({newVendorType: defaultVendorType});
    } else {
      alert('ugh');
    }
  }

  postVT = () => {
    vendorTypeRequest
      .postRequest(this.state.newVendorType)
      .then(() => {
        this.props.updateState();
        this.componentDidMount();
      });
  }

  // Edit VendorType

  showVts = () => {
    this.setState({showVts: true});
  }

  hideVts = () => {
    this.setState({showVts: false});
  }

  changeNameClick = (id, vendorType) => {
    const showEditId = id * 1;
    this.setState({showEdit: showEditId});
    this.setState({oldVendorType: vendorType});
  }

  editNameChange = (e) => {
    this.oldformFieldStringState('vendorType', e);
  }

  oldformFieldStringState = (name, e) => {
    const tempVT = {...this.state.oldVendorType};
    tempVT[name] = e.target.value;
    this.setState({oldVendorType: tempVT});
  }

  pressEnter = (e) => {
    const vtId = e.target.id * 1;
    if (e.key === 'Enter') {
      this.editFormSubmit(vtId);
    }
  }

  editFormSubmit = (vtId) => {
    const {oldVendorType} = this.state;
    oldVendorType.uid = authRequest.getUid();
    // e.preventDefault();
    if (
      oldVendorType.vendorType
    ) {
      this.putRequest(vtId, this.state.oldVendorType);
      this.setState({oldVendorType: defaultVendorType});
      this.setState({showEdit: 0});
    } else {
      alert('ugh');
    }
  }

  putRequest = (id, update) => {
    vendorTypeRequest
      .putRequest(id, update)
      .then (() => {
        this.props.updateState();
        this.componentDidMount();
      })
      .catch((err) => {
        console.error('error with update request', err);
      });
  }

  // Delete Vendor Type
  deleteClick = (e) => {
    const vendorTypeToDelete = e.target.id;
    const vendors = this.props.details;
    const vendorType = e.target.value;
    vendors.forEach((vendor) => {
      if (vendor.type !== vendorType) {
        return (
          vendorTypeRequest
            .deleteRequest(vendorTypeToDelete)
            .then(() => {
              this.props.updateState();
              this.componentDidMount();
            })
            .catch((err) => {
              console.error('error with delete request', err);
            })
        );
      } else {
        return (
          alert("no can do cowboy, the vendor: " + vendor.name + " is using this vendor type")
        );
      }
    });
  }

  render () {
    const showVts = this.state.showVts;

    const buttonComponent = (vendorType) => {
      const showEdit = this.state.showEdit;
      if (showEdit !== vendorType.id) {
        return (
          <div>
            <h3 className="col-xs-9" id={vendorType.id} onClick={() => this.changeNameClick(vendorType.id, vendorType)}>{vendorType.vendorType}</h3>
            <button type="button" className="btn btn-danger btn-sm glyphicon glyphicon-trash can" aria-hidden="true" value={vendorType.vendorType} id={vendorType.id} onClick={this.deleteClick}></button>
          </div>
        );
      } else {
        return (
          <div className="col-sm-11">
            <input type="text" className="form-control gsInput" defaultValue={vendorType.vendorType} id={vendorType.id} onChange={this.editNameChange} onKeyPress={this.pressEnter} aria-describedby="basic-addon1"/>
          </div>
        );
      }
    };

    const vendorTypeNameComponent = this.state.vendorTypes.map((vendorType) => {
      if (
        this.state.showVts !== false
      ) {
        return (
          <div className="row" key={vendorType.id}>
            {buttonComponent(vendorType)}
          </div>
        );
      } else return null;
    });
    return (
      <div>
        <div className="col-sm-8 col-sm-offset-2 text-left">
          <h2 className="text-left">Add New Vendor Type:</h2>
          <form className="row" onSubmit={this.formSubmit}>
            <fieldset className="col-xs-6">
              <label className="text-left" htmlFor="vendorType">Vendor Type</label>
              <br />
              <input
                className="col-xs-12 "
                type="text"
                id="vendorType"
                placeholder="Vendor Type Name"
                value={this.state.newVendorType.vendorType}
                onChange={this.nameChange}
              />
            </fieldset>
            <div className="row col-xs-6">
              <button className="btn-success btn-lg">Submit Vendor Type</button>
            </div>
          </form>
          {showVts ? (
            <button className="btn btn-info" onClick={this.hideVts}>Hide</button>
          ) : (
            <div className="col-xs-6 row">
              <button className="btn-danger btn-md" onClick={this.showVts}>Delete/Edit A Vendor Type</button>
            </div>) }
        </div>
        <div className="col-sm-8 col-sm-offset-2 text-left">
          {vendorTypeNameComponent}
        </div>
      </div>
    );
  }

}

export default vendorTypePage;
