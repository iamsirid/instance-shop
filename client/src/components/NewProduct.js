import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "axios";

class Login extends Component {
  state = {
    name: "",
    price: null,
    description: null,
    pictureUrl: null,
    category: null,
    stock: null,
    seller_ssn: null
  };
  onChange = e => {
    let nState = { [e.target.name]: e.target.value };

    this.setState(nState);
  };
  onSubmit = () => {
    const data = { ...this.state, seller_ssn: this.props.reduxState.ssn };
    axios
      .post("/api/product/create", data)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <div className="row mt-3">
        <div className="card col-lg-12">
          <div className="card-body">
            <h2 className="text-left mb-3">New Product</h2>
            <form>
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
                <label for="priceInput">Price</label>
                <input
                  name="price"
                  type="text"
                  className="form-control"
                  id="priceInput"
                  placeholder="Enter price"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label for="descInput">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  id="descInput"
                  rows="3"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label for="pictureUrlInput">PictureUrl</label>
                <input
                  name="pictureUrl"
                  type="text"
                  className="form-control"
                  id="pictureUrlInput"
                  placeholder="Enter pictureUrl"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label for="categoryInput">Category</label>
                <input
                  name="category"
                  type="text"
                  className="form-control"
                  id="categoryInput"
                  placeholder="Enter Category"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label for="stockInput">Stock</label>
                <input
                  name="stock"
                  type="text"
                  className="form-control"
                  id="stockInput"
                  placeholder="Enter Stock"
                  onChange={this.onChange}
                />
              </div>
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
)(Login);
