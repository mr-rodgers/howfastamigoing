import { connect } from "react-redux";
import { hot } from "react-hot-loader";

import { updateAgentProps } from "../dux/agent";
import { track, processMeasurement } from "../dux/tracking";
import App from "../components/App";

import { locationStream } from "../mock/locations";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(updateAgentProps());
    dispatch(track());

    locationStream().subscribe(next => dispatch(processMeasurement(next)));
  }
});

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
