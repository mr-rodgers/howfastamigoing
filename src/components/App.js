import React, { Component } from "react";
import PropTypes from "prop-types";

import "./App.css";

class App extends Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    );
  }

  componentDidMount() {
    this.props.onLoad();
  }
}

export default App;
