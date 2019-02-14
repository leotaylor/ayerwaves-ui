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

  render () {
    return (
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
      </div>
    );
  }

}

export default vendorTypePage;
