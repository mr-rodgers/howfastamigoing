import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.css";
import Icon from "../icon";

export default class InfoView extends Component {
  static propTypes = {
    state: PropTypes.oneOf(["entering", "entered", "exiting", "exited"])
      .isRequired,
    canInstall: PropTypes.bool.isRequired,
    onInstallRequested: PropTypes.func.isRequired,
    onCloseRequested: PropTypes.func.isRequired
  };

  static defaultProps = {
    transition: null
  };

  render() {
    return (
      <div className={classNames(styles.container, styles[this.props.state])}>
        <div className={styles.questions}>
          <div className={styles.title}>
            <span>
              <Icon
                onClick={this.props.onCloseRequested}
                className={styles.icon}
              >
                delete
              </Icon>
              <span>About</span>
            </span>

            {this.props.canInstall && (
              <Icon onClick={this.props.onInstallRequested}>download</Icon>
            )}
          </div>

          <div className={styles["question-wrapper"]}>
            <span className={styles.question}>What does it do?</span>
            <span className={styles.answer}>It tells you where you are.</span>
          </div>

          <div className={styles["question-wrapper"]}>
            <span className={styles.question}>How does it work?</span>
            <span className={styles.answer}>
              Using the GPS sensor on your device, it records changes in your
              position. Your speed is calculated by the distance between your
              positions compared with the amount of time that it took for you to
              move those distances.
            </span>
          </div>
        </div>
        <div className={styles.credits}>
          <div className={styles.title}>Credits</div>

          <div className={styles["items-wrapper"]}>
            <div className={styles.item}>
              <span className={styles.heading}>Te-j&eacute; Rodgers</span>
              <span className={styles.sub}>Design and development</span>
            </div>

            <div className={styles.item}>
              <a href="https://icons8.com" className={styles.heading}>
                <span>Icons 8</span>
                <Icon>external-link</Icon>
              </a>
              <span className={styles.sub}>Icons</span>
            </div>

            <div className={styles.item}>
              <span className={styles.heading}>Georg</span>
              <span className={styles.sub}>&#x2764;</span>
            </div>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
    );
  }
}
