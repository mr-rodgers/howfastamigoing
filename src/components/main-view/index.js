import React, { Component } from "react";
import PropTypes from "prop-types";

import Background from "./background";
import Ticker from "./ticker";
import Toolbar from "./toolbar";
import styles from "./styles.css";

export default class MainView extends Component {
  static propTypes = {
    state: PropTypes.oneOf(["entering", "entered", "exiting", "exited"])
      .isRequired,
    onInfoRequested: PropTypes.func.isRequired,
    onSettingsRequested: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
  };

  render() {
    return (
      <div className={styles[this.props.state]}>
        <Toolbar
          onInfoRequested={this.props.onInfoRequested}
          onSettingsRequested={this.props.onSettingsRequested}
        />
        <Background />
        <Ticker value={this.props.value} />
      </div>
    );
  }
}
