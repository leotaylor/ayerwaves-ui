import React from 'react';
import vendorRequest from '../../../apiRequest/vendor';
// import authRequest from '../../../firebaseRequests/auth';
import VendorTypePage from '../vendorPage/vendorTypePage';
import vendorTypeRequest from '../../../apiRequest/vendorType';

class vendorPage extends React.Component {

  state = {
    vendorTypes: [],
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
      return (
        <div key={vendor.id} className='col-sm-12'>
          <p className='col-sm-6'>{vendor.name}</p>
          <button type="button" className="btn btn-danger btn-xs glyphicon glyphicon-trash " aria-hidden="true" id={vendor.id} onClick={this.deleteClick}></button>
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
                    // onChange={this.nameChange}
                  />
                </fieldset>

              </div>
              <div className="row">
                <fieldset className="col-xs-12">
                  <label htmlFor="genre">Vendor Type:</label>
                  <br />
                  <select className="col-sm-12" onChange={this.genreChange}>
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
                    // onChange={this.descChange}
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
