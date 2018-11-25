import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "axios";
import Wallet from "./Wallet";

class Profile extends Component {
  state = {
    ssn: null,
    name: null,
    tel: null,
    email: null,
    address: null
  };
  getProfile = () => {
    axios
      .get(`/api/${this.props.reduxState.role}/${this.props.reduxState.ssn}`)
      .then(res => {
        console.log(res.data);
        this.setState(res.data);
      })
      .catch(err => console.log(err));
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => {
    const data = { ...this.state };
    axios
      .put(
        `/api/${this.props.reduxState.role}/${this.props.reduxState.ssn}`,
        data
      )
      .then(response => {
        console.log(response.data);
        this.props.doChangeName(this.state.name);
        this.getProfile();
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
  componentDidMount = () => {
    this.getProfile();
  };

  render() {
    let gender = (
      <div className="form-group">
        <label for="genderSelect">Gender</label>
        <select
          name="gender"
          id="genderSelect"
          className="form-control form-control-sm"
          v
          onChange={this.onChange}
          value={this.state.gender}
        >
          <option value="U"> </option>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
      </div>
    );
    return this.props.reduxState.role == "seller" ||
      this.props.reduxState.role == "customer" ? (
      <React.Fragment>
        <div className="row mt-3">
          <div className="card col-lg-12">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="text-left mb-3">Profile</h2>
                </div>
                <div className="col-lg-6">
                  <Wallet />
                </div>
              </div>

              <form>
                <div className="form-group">
                  <label for="ssnInput">SSN</label>
                  <input
                    name="ssn"
                    type="text"
                    className="form-control"
                    id="ssnInput"
                    placeholder="Enter SSN"
                    onChange={this.onChange}
                    value={this.state.ssn}
                    disabled={true}
                  />
                </div>
                <div className="form-group">
                  <label for="nameInput">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder="Enter name"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <label for="telInput">Tel</label>
                  <input
                    name="tel"
                    type="text"
                    className="form-control"
                    id="telInput"
                    placeholder="Enter tel"
                    onChange={this.onChange}
                    value={this.state.tel}
                  />
                </div>
                <div className="form-group">
                  <label for="emailInput">Email</label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    id="emailInput"
                    placeholder="Enter email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </div>
                {this.props.reduxState.role === "customer" ? gender : null}
                <div className="form-group">
                  <label for="addressInput">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    id="addressInput"
                    rows="3"
                    onChange={this.onChange}
                    value={this.state.address}
                  />
                </div>
              </form>
              <button className="btn btn-primary" onClick={this.onSubmit}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : null;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doChangeName: name =>
      dispatch({
        type: actionTypes.CHANGE_NAME,
        name: name
      })
  };
};
const mapStateToProps = state => {
  return {
    reduxState: state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
