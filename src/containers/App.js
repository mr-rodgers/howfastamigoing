import { connect } from "react-redux";
import { hot } from "react-hot-loader";

import { updateAgentProps } from "../actions";
import App from "../components/App";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(updateAgentProps())
});

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
