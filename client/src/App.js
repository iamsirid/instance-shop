import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import NewProduct from "./components/NewProduct";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div className="container">
          <Login />
          <NewProduct />
        </div>
      </div>
    );
  }
}

export default App;
