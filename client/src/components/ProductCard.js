import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ProductCard extends Component {
  render() {
    return (
      <div className="col-sm-3">
        <div className="col-item">
          <div className="photo">
            <img
              src={this.props.pictureUrl}
              className="img-responsive"
              alt="a"
            />
          </div>
          <div className="info">
            <div className="row">
              <div className="price col-md-6">
                <h5>{this.props.name}</h5>
              </div>
              <div className="rating hidden-sm col-md-6">
                <h5 className="price-text-color">฿{this.props.price}</h5>
              </div>
            </div>
            <div className="separator clear-left">
              <p className="btn-details">
                <i className="fa fa-list" />
                {/* <a href="http://www.jquery2dotnet.com" className="hidden-sm">
                  More details
                </a> */}
                <NavLink
                  className="hidden-sm"
                  exact
                  to={`/product/${this.props.id}`}
                >
                  More details
                </NavLink>
              </p>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
