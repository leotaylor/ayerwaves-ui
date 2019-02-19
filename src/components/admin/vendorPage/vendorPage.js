import React from 'react';
import vendorRequest from '../../../apiRequest/vendor';
import authRequest from '../../../firebaseRequests/auth';
import VendorTypePage from '../vendorPage/vendorTypePage';
import vendorTypeRequest from '../../../apiRequest/vendorType';

const defaultVendor = {
  name: '',
  type: 0,
  description: '',
  requirements: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

class vendorPage extends React.Component {

  state = {
    vendorTypes: [],
    newVendor: defaultVendor,
    showVendorEdit: 0,
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

  updateVendorState = () => {
    this.componentDidMount();
  }

  // Post New Vendro

  formFieldStringState = (name, e) => {
    const tempVendor = {...this.state.newVendor};
    tempVendor[name] = e.target.value;
    this.setState({newVendor: tempVendor});
  }

  formFieldNumberState = (name, e) => {
    const tempVendor = {...this.state.newVendor};
    tempVendor[name] = e.target.value * 1;
    this.setState({newVendor: tempVendor});
  }

  nameChange = (e) => {
    this.formFieldStringState('name', e);
  };

  typeChange = (e) => {
    this.formFieldNumberState('type', e);
  }

  descChange = (e) => {
    this.formFieldStringState('description', e);
  };

  reqChange = (e) => {
    this.formFieldStringState('requirements', e);
  };

  contactNameChange = (e) => {
    this.formFieldStringState('contactName', e);
  };

  contactEmailChange = (e) => {
    this.formFieldStringState('contactEmail', e);
  };

  contactPhoneChange = (e) => {
    this.formFieldStringState('contactPhone', e);
  };

  formSubmit = (e) => {
    const {newVendor} = this.state;
    newVendor.uid = authRequest.getUid();
    e.preventDefault();
    if (
      newVendor.name &&
      newVendor.type &&
      newVendor.description
    ) {
      this.postVendor(this.state.newVendor);
      this.setState({newVendor: defaultVendor});
    } else {
      alert('ugh');
    }
  }

  postVendor = (e) => {
    vendorRequest
      .postRequest(this.state.newVendor)
      .then(() => {
        this.updateVendorState();
        this.props.updateState();
      });
  }

  // EDIT VENDOR

  editVendor = (id, vendor) => {
    const showEditId = id * 1;
    this.setState({showVendorEdit: showEditId});
    this.setState({newVendor: vendor});
  }

  hideVendor = () => {
    this.setState({showVendorEdit: 0});
    this.setState({newVendor: defaultVendor});
  }

  // DELETE VENDOR

  deleteClick = (e) => {
    const vendorToDelete = e.target.id;
    vendorRequest
      .deleteRequest(vendorToDelete)
      .then(() => {
        this.props.updateState();
      })
      .catch((err) => {
        console.error('error with delete request', err);
      });
  }

  render () {
    const vendorComponent = this.props.details.map((vendor) => {
      const showVendor = this.state.showVendorEdit;
      if (showVendor !== vendor.id) {
        return (
          <div key={vendor.id} className='col-sm-12'>
            <p className='col-sm-6' onClick={() => this.editVendor(vendor.id, vendor)} >{vendor.name}</p>
            <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash " aria-hidden="true" id={vendor.id} onClick={this.deleteClick}></button>
          </div>
        );
      } else return (
        <div className="row" key={vendor.id}>
          <div className="col-xs-8">
            <h2 className="text-center">Edit Vendor:</h2>
            <form onSubmit={this.editFormSubmit}>
              <div className="row">
                <fieldset className="col-xs-12">
                  <label className="text-left" htmlFor="name">Name:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="name"
                    placeholder="Vendor Name"
                    defaultValue={vendor.name}
                    onChange={this.nameChange}
                  />
                </fieldset>

              </div>
              <div className="row">
                <fieldset className="col-xs-12">
                  <label htmlFor="type">Vendor Type:</label>
                  <br />
                  <select className="col-sm-12" onChange={this.typeChange}>
                    <option>Vendor Type</option>
                    {vendorSelectComponent}
                  </select>
                </fieldset>
              </div>

              <div className="row">
                <fieldset className="col-xs-12">
                  <label htmlFor="description">Description:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="description"
                    placeholder="Description..."
                    defaultValue={vendor.description}
                    onChange={this.descChange}
                  />
                </fieldset>
              </div>
              <div className="row">
                <fieldset className="col-xs-12">
                  <label htmlFor="requirements">Requirements:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="requirements"
                    placeholder="Requirements..."
                    defaultValue={vendor.requirements}
                    onChange={this.reqChange}
                  />
                </fieldset>
              </div>
              <div className="row">
                <fieldset className="col-xs-4">
                  <label htmlFor="contactName">Contact Name:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="contactName"
                    placeholder="First Last Name"
                    defaultValue={vendor.contactName}
                    onChange={this.contactNameChange}
                  />
                </fieldset>

                <fieldset className="col-xs-4">
                  <label htmlFor="contactEmail">Contact Email:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="contactEmail"
                    placeholder="dude@dude.com"
                    onChange={this.contactEmailChange}
                    defaultValue={vendor.contactEmail}
                  />
                </fieldset>

                <fieldset className="col-xs-4">
                  <label htmlFor="contactPhone">Contact Phone:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="contactPhone"
                    placeholder="555-555-5555"
                    onChange={this.contactPhoneChange}
                    defaultValue={vendor.contactPhone}
                  />
                </fieldset>
              </div>
              <button className="btn-success btn-lg">Submit Vendor</button>
            </form>
          </div>
          <button className="btn btn-info" onClick={this.hideVendor}>Hide</button>
        </div>
      );
    });

    const vendorSelectComponent = this.state.vendorTypes.map((vendorType) => {
      return (
        <option className="col-sm-6" value={vendorType.id} key={vendorType.id}>
          {vendorType.vendorType}
        </option>
      );
    });

    return (
      <div className='col-sm-12'>
        <div className="col-sm-4 text-left">
          <h1>Vendors</h1>
          <div className="row">
            {vendorComponent}
          </div>
        </div>
        <div className="col-sm-4 text-center">
          <div className="col-xs-12 text-center">
            <h2 className="text-center">Add NEW Vendor:</h2>
            <form onSubmit={this.formSubmit}>
              <div className="row">
                <fieldset className="col-xs-12">
                  <label className="text-left" htmlFor="name">Name:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="name"
                    placeholder="Vendor Name"
                    // value={this.props.details.name}
                    onChange={this.nameChange}
                  />
                </fieldset>

              </div>
              <div className="row">
                <fieldset className="col-xs-12">
                  <label htmlFor="type">Vendor Type:</label>
                  <br />
                  <select className="col-sm-12" onChange={this.typeChange}>
                    <option>Vendor Type</option>
                    {vendorSelectComponent}
                  </select>
                </fieldset>
              </div>

              <div className="row">
                <fieldset className="col-xs-12">
                  <label htmlFor="description">Description:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="description"
                    placeholder="Description..."
                    // value={this.state.newArtist.description}
                    onChange={this.descChange}
                  />
                </fieldset>
              </div>
              <div className="row">
                <fieldset className="col-xs-12">
                  <label htmlFor="requirements">Requirements:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="requirements"
                    placeholder="Requirements..."
                    // value={this.state.newArtist.description}
                    onChange={this.reqChange}
                  />
                </fieldset>
              </div>
              <div className="row">
                <fieldset className="col-xs-4">
                  <label htmlFor="contactName">Contact Name:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="contactName"
                    placeholder="First Last Name"
                    // defaultValue={artist.description}
                    onChange={this.contactNameChange}
                  />
                </fieldset>

                <fieldset className="col-xs-4">
                  <label htmlFor="contactEmail">Contact Email:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="contactEmail"
                    placeholder="dude@dude.com"
                    onChange={this.contactEmailChange}
                    // defaultValue={artist.imageLink}
                  />
                </fieldset>

                <fieldset className="col-xs-4">
                  <label htmlFor="contactPhone">Contact Phone:</label>
                  <br />
                  <input
                    className="col-xs-12"
                    type="text"
                    id="contactPhone"
                    placeholder="555-555-5555"
                    onChange={this.contactPhoneChange}
                    // defaultValue={artist.imageLink}
                  />
                </fieldset>
              </div>
              <button className="btn-success btn-lg">Submit Vendor</button>
            </form>
          </div>

        </div>
        <div className='col-sm-4 text-center'>
          <VendorTypePage
            updateState={this.props.updateState}
            details={this.props.details}
            vtprops={this.state.vendorTypes}
            updateVen={this.updateVendorState}
          />
        </div>
      </div>
    );
  }
}

export default vendorPage;
