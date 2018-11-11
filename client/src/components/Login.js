import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "axios";

class Login extends Component {
  state = {
    ssn: "",
    loginError: null,
    selectedRole: "seller"
  };

  onLoginClick = () => {
    console.log("onLoginClick");
    if (!this.state.ssn) return;
    const data = {
      ssn: this.state.ssn,
      role: this.state.selectedRole
    };
    axios
      .post(`/api/login/`, data)
      .then(response => {
        console.log(response.data);
        this.props.doLogin(data.ssn, data.role, response.data.name);
        this.setState({ loginError: null });
      })
      .catch(err => {
        // console.log(err);
        console.log(err.response.data);
        this.setState({ loginError: err.response.data.errMsg });
      });

    // this.props.doLogin(this.state.loginInput);
  };
  // onLoginInputChanged = e => {
  //   console.log(e.target.value);
  //   this.setState({ loginInput: e.target.value });
  // };
  onChange = e => {
    let nState = { [e.target.name]: e.target.value };

    this.setState(nState);
  };

  render() {
    let loginInfo = null;
    if (this.props.reduxState.isLogin) {
      loginInfo = <h1>Login as {this.props.reduxState.ssn}</h1>;
    }
    let loginErrorShow = null;
    if (this.state.loginError) {
      loginErrorShow = <h1>{this.state.loginError}</h1>;
    }
    return (
      <React.Fragment>
        <div className="form-group">
          <label for="roleSelect">Login as</label>
          <select
            name="selectedRole"
            id="roleSelect"
            className="form-control form-control-sm"
            value={this.state.selectedRole}
            onChange={this.onChange}
          >
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
          <label for="loginInput">SSN</label>
          <input
            name="ssn"
            className="form-control"
            id="loginInput"
            placeholder="Enter SSN"
            onChange={this.onChange}
          />
        </div>
        <button onClick={this.onLoginClick} className="btn btn-primary">
          Login
        </button>
        <button onClick={this.props.doLogout} className="btn btn-primary">
          Logout
        </button>

        {loginInfo}
        {loginErrorShow}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogin: (ssn, role, name) =>
      dispatch({
        type: actionTypes.LOGIN,
        ssn: ssn,
        role: role,
        name: name
      }),
    doLogout: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
