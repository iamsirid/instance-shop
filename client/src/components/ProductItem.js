import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "axios";

class ProductItem extends Component {
  state = {
    productData: {
      product_id: null,
      name: null,
      price: null,
      description: null,
      pictureUrl: null,
      category: null,
      stock: null,
      seller_ssn: null
    },
    productItemId: null,
    amount: null,
    orderId: null,
    totalItemPrice: null
  };

  updatePriceToCart = () => {
    this.props.updateTotalPrice({
      id: this.state.productItemId,
      price: this.state.totalItemPrice
    });
  };
  updateItemPrice = () => {
    this.setState({
      totalItemPrice: this.state.amount * this.state.productData.price
    });
  };
  getProductInfo = () => {
    // console.log("this.props.productItemId: " + this.props.productItemId);
    axios
      .get(`/api/product/${this.props.productId}`)
      .then(res => {
        console.log(res.data);
        this.setState({ productData: res.data }, () => {
          this.updateItemPrice();
        });
        this.updatePriceToCart();
      })
      .catch(err => console.log(err));
  };
  //   componentDidUpdate = () => {
  //     this.updatePriceToCart();
  //   };
  componentDidMount = () => {
    this.setState(
      {
        amount: this.props.amount,
        orderId: this.props.orderId,
        productItemId: this.props.productItemId
      },
      () => {
        this.getProductInfo();
      }
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <tr>
        <td className="col-sm-8 col-md-6">
          <div className="media">
            <a className="thumbnail pull-left" href="#">
              <img
                className="media-object"
                src={this.state.productData.pictureUrl}
                style={{ width: 72, height: 72 }}
              />
            </a>
            <div className="media-body">
              <h4 className="media-heading">
                <a href="#">{this.state.productData.name}</a>
              </h4>

              <span>Status: </span>
              <span className="text-success">
                <strong>
                  {this.state.productData.stock >= 0
                    ? "In Stock"
                    : "Out of stock"}
                </strong>
              </span>
            </div>
          </div>
        </td>
        <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
          <input
            name="amount"
            type="number"
            className="form-control"
            disabled={true}
            value={this.state.amount}
            onChange={this.onChange}
          />
        </td>
        <td className="col-sm-1 col-md-1 text-center">
          <strong>฿{this.state.productData.price}</strong>
        </td>
        {/* <td className="col-sm-1 col-md-1 text-center">
          <strong>$??.??</strong>
        </td> */}
        <td className="col-sm-1 col-md-1">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.props.onRemove(this.state.productItemId)}
          >
            <span className="glyphicon glyphicon-remove" /> Remove
          </button>
        </td>
      </tr>
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
)(ProductItem);
