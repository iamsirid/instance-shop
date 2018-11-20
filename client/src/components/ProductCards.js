import React, { Component } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./ProductCards.css";

class ProductCards extends Component {
  state = { productList: [] };
  getAllProduct = () => {
    axios
      .get(`/api/product/all`)
      .then(res => {
        console.log(res.data);
        this.setState({ productList: res.data });
      })
      .catch(err => console.log(err));
  };
  // componentDidUpdate = () => {
  //   this.getAllProduct();
  // };
  componentDidMount = () => {
    this.getAllProduct();
  };
  render() {
    let productList = this.state.productList.slice(
      0,
      this.state.productList.length
    );
    productList = productList.map(product => (
      <ProductCard
        key={product.product_id}
        name={product.name}
        pictureUrl={product.pictureUrl}
        price={product.price}
        id={product.product_id}
      />
    ));
    return (
      <div className="mt-5">
        <div className="row">
          <div className="col-md-9">
            {/* <h3>Carousel Product Cart Slider</h3> */}
          </div>
        </div>
        <div className="row">{productList}</div>
      </div>
    );
  }
}

export default ProductCards;
