import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class ProductShow extends Component {
  state = {
    data: {
      product_id: null,
      name: null,
      price: null,
      description: null,
      pictureUrl: null,
      category: null,
      stock: null,
      seller_ssn: null
    },
    sellerInfo: {
      ssn: null,
      name: null,
      tel: null,
      email: null,
      address: null,
      wallet_id: null
    },
    amount: 0
  };
  componentDidMount = () => {
    const {
      match: { params }
    } = this.props;
    const getSellerInfo = ssn => {
      axios
        .get(`/api/seller/${ssn}`)
        .then(res => {
          console.log(res.data);
          this.setState({ sellerInfo: res.data });
        })
        .catch(err => console.log(err));
    };
    axios
      .get(`/api/product/${params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
        getSellerInfo(res.data.seller_ssn);
      })
      .catch(err => console.log(err));
  };
  onAmountChange = e => {
    this.setState({ amount: e.target.value });
  };
  onAddToCart = () => {
    const data = {
      amount: this.state.amount,
      product_id: this.state.data.product_id,
      customer_ssn: this.props.reduxState.ssn
    };
    const createProductItem = () => {
      axios
        .post(`/api/productItem/create`, data)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    };
    const removeDuplicateProductItem = productItemId => {
      axios
        .delete(`/api/productItem/delete/${productItemId}`)
        .then(response => {
          console.log(response.data);
          createProductItem();
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.data);
        });
    };

    axios
      .get(`/api/productItem/${this.props.reduxState.ssn}`)
      .then(res => {
        let productItemList = res.data;
        let productItemId = null;
        let isAlreadyInCart = productItemList.some(productItem => {
          if (productItem.product_id === data.product_id) {
            productItemId = productItem.product_item_id;
            return true;
          }
          return false;
        });
        console.log("isAlreadyInCart: " + isAlreadyInCart);
        if (isAlreadyInCart) removeDuplicateProductItem(productItemId);
        else createProductItem();
      })
      .catch(err => console.log(err));
  };
  render() {
    let addToCart = null;
    if (this.props.reduxState.role === "customer") {
      addToCart = (
        <React.Fragment>
          <hr />
          <p className="text-left">Buy This Product</p>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Amout
              </span>
            </div>
            <input
              name="amount"
              type="text"
              className="form-control"
              onChange={this.onAmountChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.onAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="row mt-5">
          <div className="col-6">
            <div id="carouselExampleIndicators" style={{ height: 250 }}>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src={this.state.data.pictureUrl}
                    alt="ProductPic"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h3 className="float-left-md">{this.state.data.name}</h3>
                <h3 className="float-right text-danger">
                  ฿{this.state.data.price}
                </h3>
                <p className="text-left">
                  Category : {this.state.data.category}
                </p>
                <p className="text-left">
                  Description : {this.state.data.description}
                </p>
                {addToCart}
              </div>
            </div>
            <div className="card mt-1">
              <div className="card-body">
                <h3>Seller</h3>
                <i className="material-icons"> person </i>

                <span className="ml-3">{this.state.sellerInfo.name}</span>

                <i className="material-icons ml-5"> phone </i>
                <span>{this.state.sellerInfo.tel}</span>
                <p />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="card col-lg-12">
            <div className="card-body">
              <h2 className="text-left mb-3">Review</h2>
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

export default connect(
  mapStateToProps,
  null
)(ProductShow);
