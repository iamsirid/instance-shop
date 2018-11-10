import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";

class Login extends Component {
  // onLoginClick = () => {
  //   console.log("onLoginClick");
  //   this.props.onLogin();
  // };
  state = {
    loginInput: ""
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
        <button
          onClick={() => this.props.onLogin(this.state.loginInput)}
          className="btn btn-primary"
        >
          Login
        </button>
        <button onClick={this.props.onLogout} className="btn btn-primary">
          Logout
        </button>

        {loginInfo}
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
    onLogin: ssn =>
      dispatch({
        type: actionTypes.LOGIN,
        ssn: ssn
      }),
    onLogout: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
