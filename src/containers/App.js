import { connect } from "react-redux";
import { hot } from "react-hot-loader";

import { updateAgentProps } from "../dux/agent";
import { enableInstall, disableInstall } from "../dux/installer";
import { loadSettings } from "../dux/settings";
import { track, processMeasurement } from "../dux/tracking";
import App from "../components/App";

import { locationStream } from "../mock/locations";

const mapStateToProps = ({ settings }) => ({
  settings
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(loadSettings());
    dispatch(updateAgentProps());
    dispatch(track());

    // Events for add to homescreen action
    window.addEventListener("beforeinstallprompt", e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      dispatch(enableInstall(e));
    });
  },
  dispatch
});

const mergeProps = ({ settings, speed }, { dispatch, onLoad }, ownProps) => ({
  ...ownProps,
  speed,
  onLoad: () => {
    onLoad();
    locationStream().subscribe(measure =>
      dispatch(processMeasurement({ measure, settings }))
    );
  }
});

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
