import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../icon";

import styles from "./styles.css";

class Toolbar extends Component {
  static propTypes = {
    onInfoRequested: PropTypes.func.isRequired,
    onSettingsRequested: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className={styles.toolbar}>
        <div>
          <Icon onClick={this.props.onSettingsRequested}>settings</Icon>
          <span>Settings</span>
        </div>
        <Icon onClick={this.props.onInfoRequested}>info</Icon>
      </div>
    );
  }
}

export default Toolbar;
