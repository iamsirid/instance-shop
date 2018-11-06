import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Working in back-end...</header>
        <div className="container">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
