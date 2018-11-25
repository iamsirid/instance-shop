import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Wallet extends Component {
  state = {};
  componentDidMount = () => {
    axios
      .get(
        `/api/${this.props.reduxState.role}/${this.props.reduxState.ssn}/wallet`
      )
      .then(res => {
        console.log(res.data);
        this.setState(res.data);
      })
      .catch(err => console.log(err));
  };
  onValueChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="col-item">
            <div className="info">
              <div className="row">
                <div className="price col-md-6">
                  <h5>Wallet</h5>
                </div>
                <div className="rating hidden-sm col-md-6">
                  <h5 className="price-text-color">฿{this.state.value}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    reduxState: state
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Wallet)
);
