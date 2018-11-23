import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "axios";
import ProductItem from "./ProductItem";

class Cart extends Component {
  state = {
    productItemList: [],
    totalPrice: 0
    // productItemPriceList: []
  };
  // productItemRefList = [];
  getAllProductItem = () => {
    axios
      .get(`/api/productItem/${this.props.reduxState.ssn}`)
      .then(res => {
        console.log(res.data);
        this.setState({ productItemList: res.data }, () => {
          this.updateTotalPrice();
        });
      })
      .catch(err => console.log(err));
  };
  //   componentDidUpdate = () => {
  //     this.getAllProductItem();
  //   };
  componentDidMount = () => {
    this.getAllProductItem();
  };
  onUpdateProductItemPrice = opt => {
    let productItemList = [...this.state.productItemList];
    productItemList.forEach((e, i) => {
      if (e.product_item_id === opt.id) {
        let nData = { ...e };
        nData.price = opt.price;
        productItemList[i] = { ...nData };
      }
    });

    this.setState({ productItemList: productItemList }, () => {
      this.updateTotalPrice();
    });
  };

  onCheckout = () => {
    const data = { customer_ssn: this.props.reduxState.ssn };
    axios
      .post("/api/order/create", data)
      .then(response => {
        console.log(response.data);
        // this.setState(this.state);
        // this.forceUpdate();
        this.getAllProductItem();
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
  updateTotalPrice = () => {
    let totalPrice = 0;
    let productItemList = [...this.state.productItemList];
    productItemList.forEach(e => {
      if (e.price != null) totalPrice += e.price;
    });

    this.setState({ totalPrice: totalPrice });
  };
  //   onUpdateProductItemPriceList = opt => {
  //     console.log(opt);
  //     console.log("opt");
  //     let productItemPriceList = [...this.state.productItemPriceList];
  //     // let updateId = null;
  //     productItemPriceList.push({ id: opt.id, price: opt.price });
  //     // productItemPrice[opt.id] = opt.price;
  //     this.setState({ productItemPriceList: productItemPriceList }, () =>
  //       this.updateTotalPrice()
  //     );
  //     // let totalPrice = 0;
  //     // this.productItemRefList.forEach(element => {
  //     //   totalPrice += element.mRef.state.totalItemPrice;
  //     // });
  //     // this.setState({ totalPrice: totalPrice });
  //   };

  onRemoveProductItem = productItemId => {
    // console.log("YESSSSS EIEI");
    const removeProductItemComponent = () => {
      let productItemList = this.state.productItemList.slice(
        0,
        this.state.productItemList.length
      );

      //   productItemList.

      for (let i = 0; i < productItemList.length; i++) {
        if (productItemList[i].product_item_id === productItemId) {
          productItemList.splice(i, 1);
          break;
        }
      }

      this.setState({ productItemList: productItemList }, () => {
        this.updateTotalPrice();
      });
    };
    axios
      .delete(`/api/productItem/delete/${productItemId}`)
      .then(response => {
        console.log(response.data);
        // this.getAllProductItem();
        removeProductItemComponent();
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
  render() {
    let productItemList = this.state.productItemList.slice(
      0,
      this.state.productItemList.length
    );
    productItemList = productItemList.map(productItem => {
      if (productItem.order_id != null) {
        return null;
      }

      return (
        <ProductItem
          key={productItem.product_item_id}
          productItemId={productItem.product_item_id}
          productId={productItem.product_id}
          amount={productItem.amount}
          orderId={productItem.order_id}
          onRemove={ptId => this.onRemoveProductItem(ptId)}
          updateTotalPrice={opt => this.onUpdateProductItemPrice(opt)}
          // ref={productItemRef => {
          //   this.productItemRefList.push({
          //     id: productItem.product_item_id,
          //     mRef: productItemRef
          //   });
          // }}
        />
      );
    });
    return (
      <div className="row">
        <div className="col-sm-12 col-md-10 col-md-offset-1">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th className="text-center">Price</th>
                {/* <th className="text-center">Total</th> */}
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {productItemList}
              {/* <tr>
                <td>   </td>
                <td>   </td>
                <td>   </td>
                <td>
                  <h5>Subtotal</h5>
                </td>
                <td className="text-right">
                  <h5>
                    <strong>$24.59</strong>
                  </h5>
                </td>
              </tr>
              <tr>
                <td>   </td>
                <td>   </td>
                <td>   </td>
                <td>
                  <h5>Estimated shipping</h5>
                </td>
                <td className="text-right">
                  <h5>
                    <strong>$6.94</strong>
                  </h5>
                </td>
              </tr>
              */}
              <tr>
                <td>   </td>
                <td>   </td>
                <td>   </td>
                <td>
                  <h3>Total</h3>
                </td>
                <td className="text-right">
                  <h3>
                    <strong>฿{this.state.totalPrice}</strong>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>   </td>
                <td>   </td>
                <td>   </td>
                <td>
                  {/* <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-shopping-cart" />{" "}
                    Continue Shopping
                  </button> */}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.onCheckout}
                    disabled={this.state.totalPrice === 0}
                  >
                    Checkout <span className="glyphicon glyphicon-play" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
)(Cart);
