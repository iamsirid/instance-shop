import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "axios";

class Login extends Component {
  state = {
    loginInput: "",
    loginError: null
  };

  onLoginClick = () => {
    console.log("onLoginClick");
    if (!this.state.loginInput) return;
    const data = {
      ssn: this.state.loginInput,
      role: "seller"
    };
    axios
      .post("/api/login", data)
      .then(response => {
        console.log(response.data);
        this.props.doLogin(this.state.loginInput);
        this.setState({ loginError: null });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ loginError: err.response.data.errMsg });
      });

    // this.props.doLogin(this.state.loginInput);
  };
  onLoginInputChanged = e => {
    console.log(e.target.value);
    this.setState({ loginInput: e.target.value });
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
          <label for="loginInput">SSN</label>
          <input
            className="form-control"
            id="loginInput"
            placeholder="Enter SSN"
            onChange={this.onLoginInputChanged}
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
    doLogin: ssn =>
      dispatch({
        type: actionTypes.LOGIN,
        ssn: ssn
      }),
    doLogout: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
