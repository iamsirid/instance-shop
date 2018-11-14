import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import NewProduct from "./components/NewProduct";

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

            <NewProduct />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
