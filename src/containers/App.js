import { connect } from "react-redux";
import { hot } from "react-hot-loader";

import { updateAgentProps } from "../dux/agent";
import { track } from "../dux/tracking";
import App from "../components/App";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(updateAgentProps());
    dispatch(track());
  }
});

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
