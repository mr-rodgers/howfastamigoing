import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

class App extends Component {
  static propTypes = {
    value: PropTypes.number,
    updateDuration: PropTypes.number
  };

  static defaultProps = {
    updateDuration: 500
  };

  constructor(props) {
    super(props);
    this.state = {
      speed: Math.round(props.value || 0)
    };

    this.animation = null;
  }

  render() {
    return (
      <div className={styles.ticker}>
        <span className={styles.heading}>Your current speed is</span>
        <span className={styles.speed}>{Math.round(this.props.value)}</span>
        <span className={styles.unit}>KM/H</span>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value != this.props.value) {
      if (this.animation) {
        const { timer } = this.animation;
        cancelAnimationFrame(timer);
      }
      this.animation = {
        target: this.props.value,
        started: performance.now(),
        init: this.state.speed
      };
      this.animation.timer = requestAnimationFrame(this.updateValue);
    }
  }

  updateValue = now => {
    const { target, started, init } = this.animation;
    const t = (now - started) / this.props.updateDuration;
    const speed = Math.round(init + this.easing(t) * (target - init));
    this.setState({ speed });
    if (t < 1) {
      requestAnimationFrame(this.updateValue);
    }
  };

  easing(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}

export default App;
