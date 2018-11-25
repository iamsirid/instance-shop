import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import NewProduct from "./components/NewProduct";
import ProductShow from "./components/ProductShow";
import ProductCards from "./components/ProductCards";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
// import Wallet from "./components/Wallet";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/new-product" component={NewProduct} />
            <Route path="/product/:id" component={ProductShow} />
            <Route exact path="/" component={ProductCards} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/wallet/" component={Wallet} /> */}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
