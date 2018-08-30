import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.css";
import Icon from "../icon";

export default class SettingsOverlay extends Component {
  static propTypes = {
    state: PropTypes.oneOf(["entering", "entered", "exiting", "exited"])
      .isRequired,
    tripMaxIdleTime: PropTypes.number.isRequired,
    tripDataRetentionWindow: PropTypes.number.isRequired,
    onCloseRequested: PropTypes.func.isRequired,
    updateTripMaxIdleTime: PropTypes.func.isRequired,
    updateTripDataRetentionWindow: PropTypes.func.isRequired
  };

  updateRetentionWindow = e => {
    this.props.updateTripDataRetentionWindow(this.extractValue(e) * 60000);
  };

  updateMaxIdleTime = e => {
    this.props.updateTripMaxIdleTime(this.extractValue(e) * 1000);
  };

  extractValue = e => e.target.value.replace(/\D/g, "") * 1 || 0;

  render() {
    return (
      <div className={classNames(styles.container, styles[this.props.state])}>
        <div className={styles.title}>
          <Icon onClick={this.props.onCloseRequested} className={styles.icon}>
            delete
          </Icon>
          <span>Settings</span>
        </div>

        <div className={styles.form}>
          <div className={styles.item}>
            <div className={styles.desc}>Record trip data for up to</div>
            <input
              type="text"
              value={Math.round(this.props.tripDataRetentionWindow / 60000)}
              onChange={this.updateRetentionWindow}
            />
            <label>minutes</label>
          </div>

          <div className={styles.item}>
            <div className={styles.desc}>Trip ends if I haven't moved for</div>
            <input
              type="text"
              value={Math.round(this.props.tripMaxIdleTime / 1000)}
              onChange={this.updateMaxIdleTime}
            />
            <label>seconds</label>
          </div>
        </div>
      </div>
    );
  }
}
