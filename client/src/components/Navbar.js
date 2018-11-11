import React, { Component } from "react";
import { connect } from "react-redux";
class Navbar extends Component {
  render() {
    let rightMenu = null;
    if (this.props.reduxState.isLogin) {
      rightMenu = (
        <React.Fragment>
          <li className="nav-item">
            <span className="nav-link">
              {this.props.reduxState.role}: {this.props.reduxState.ssn}
            </span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Logout
            </a>
          </li>
        </React.Fragment>
      );
    } else {
      rightMenu = (
        <React.Fragment>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Register
            </a>
          </li>
        </React.Fragment>
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
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
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

export default connect(
  mapStateToProps,
  null
)(Navbar);
