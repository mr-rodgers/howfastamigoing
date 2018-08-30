import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./styles.css";

class Icon extends Component {
  static propTypes = {
    children: PropTypes.oneOf([
      "delete",
      "download",
      "external-link",
      "info",
      "settings"
    ]),
    onClick: PropTypes.func
  };

  render() {
    return (
      <i
        className={classNames({
          ["icons8-" + this.props.children]: true,
          [styles.icon]: true,
          [styles.clickable]: this.props.onClick !== undefined
        })}
        onClick={this.props.onClick}
      />
    );
  }
}

export default Icon;
