import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actionTypes from "../store/actions";
class Navbar extends Component {
  render() {
    let rightMenu = null;
    if (this.props.reduxState.isLogin) {
      rightMenu = (
        <React.Fragment>
          <li className="nav-item">
            <a className="nav-link" href="#">
              {this.props.reduxState.name}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.props.doLogout}>
              Logout
            </a>
          </li>
        </React.Fragment>
      );
    } else {
      rightMenu = (
        <React.Fragment>
          <li className="nav-item">
            {/* <a className="nav-link" href="#">
              Login
            </a> */}
            <NavLink className="nav-link" exact to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            {/* <a className="nav-link" href="#">
              Register
            </a> */}
            <NavLink className="nav-link" exact to="/register">
              Register
            </NavLink>
          </li>
        </React.Fragment>
      );
    }
    let newProductMenu = null;
    if (this.props.reduxState.role === "seller") {
      newProductMenu = (
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/new-product">
            New Product
          </NavLink>
        </li>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          InstanceShop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Cart
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Wallet
              </a>
            </li>
            {newProductMenu}
          </ul>
          <ul className="navbar-nav mr-right">{rightMenu}</ul>
        </div>
      </nav>
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
    doLogout: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
