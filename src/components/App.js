import React, { Component } from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";
import TransitionGroup from "react-transition-group/Transition";

import InfoView from "../containers/info-view";
import SettingsOverlay from "../containers/settings-overlay";
import MainView from "../containers/main-view";

import styles from "./styles.css";

class App extends Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      view: "main",
      settingsVisible: false
    };
  }

  changeView = view => this.setState({ view });
  onInfoViewRequested = () => this.changeView("info");
  onMainViewRequested = () => this.changeView("main");
  openSettings = () => this.setState({ settingsVisible: true });
  closeSettings = () => this.setState({ settingsVisible: false });

  render() {
    return (
      <div className={styles.app}>
        <Transition
          in={this.state.view === "main"}
          timeout={500}
          unmountOnExit
          appear
        >
          {state => (
            <MainView
              onInfoRequested={this.onInfoViewRequested}
              onSettingsRequested={this.openSettings}
              state={state}
            />
          )}
        </Transition>
        <Transition
          in={this.state.view === "info"}
          timeout={500}
          unmountOnExit
          appear
        >
          {state => (
            <InfoView
              onCloseRequested={this.onMainViewRequested}
              state={state}
            />
          )}
        </Transition>
        <Transition
          in={this.state.settingsVisible}
          timeout={500}
          unmountOnExit
          appear
        >
          {state => (
            <SettingsOverlay
              state={state}
              onCloseRequested={this.closeSettings}
            />
          )}
        </Transition>
      </div>
    );
  }

  componentDidMount() {
    this.props.onLoad();
  }
}

export default App;
