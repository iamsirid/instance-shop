import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "axios";

class Register extends Component {
  state = {
    selectedRole: "customer",
    data: {}
  };
  onChange = e => {
    let nData = { ...this.state.data, [e.target.name]: e.target.value };

    this.setState({ data: nData });
  };
  onSelectChange = e => {
    this.setState({ selectedRole: e.target.value });
  };
  onSubmit = () => {
    const data = this.state.data;
    axios
      .post(`/api/${this.state.selectedRole}/create`, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  render() {
    let gender = (
      <div className="form-group">
        <label for="genderSelect">Gender</label>
        {/* <input
          name="gender"
          type="text"
          className="form-control"
          id="genderInput"
          placeholder="Enter gender"
          onChange={this.onChange}
        /> */}
        <select
          name="gender"
          id="genderSelect"
          className="form-control form-control-sm"
          v
          onChange={this.onChange}
        >
          <option value="U"> </option>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
      </div>
    );
    let address = (
      <div className="form-group">
        <label for="addressInput">Address</label>
        <textarea
          name="address"
          className="form-control"
          id="addressInput"
          rows="3"
          onChange={this.onChange}
        />
      </div>
    );
    let salary = (
      <div className="form-group">
        <label for="salaryInput">Salary</label>
        <input
          name="salary"
          type="text"
          className="form-control"
          id="salaryInput"
          placeholder="Enter Salary"
          onChange={this.onChange}
        />
      </div>
    );
    let companyName = (
      <div className="form-group">
        <label for="companyNameInput">Company Name</label>
        <input
          name="companyName"
          type="text"
          className="form-control"
          id="companyNameInput"
          placeholder="Enter Company Name"
          onChange={this.onChange}
        />
      </div>
    );
    return this.props.reduxState.isLogin ? null : (
      <div className="row mt-3">
        <div className="card col-lg-12">
          <div className="card-body">
            <h2 className="text-left mb-3">New {this.state.selectedRole}</h2>
            <form>
              <select
                name="selectedRole"
                id="roleSelect"
                className="form-control form-control-sm"
                value={this.state.selectedRole}
                onChange={this.onSelectChange}
              >
                <option value="seller">Seller</option>
                <option value="customer">Customer</option>
              </select>
              <div className="form-group">
                <label for="ssnInput">SSN</label>
                <input
                  name="ssn"
                  type="text"
                  className="form-control"
                  id="ssnInput"
                  placeholder="Enter ssn"
                  onChange={this.onChange}
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
                />
              </div>
              {this.state.selectedRole === "customer" ? gender : null}
              {this.state.selectedRole === "customer" ||
              this.state.selectedRole === "seller"
                ? address
                : null}
            </form>
            <button className="btn btn-primary" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  };
};

export default connect(
  mapStateToProps,
  null
)(Register);
