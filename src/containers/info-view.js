import { connect } from "react-redux";

import InfoView from "../components/info-view";
import { disableInstall } from "../dux/installer";

const mapStateToProps = ({ installer }) => ({
  installer
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = ({ installer }, { dispatch }, ownProps) => ({
  ...ownProps,
  canInstall: installer.event !== null,
  onInstallRequested: () => {
    dispatch(disableInstall());
    installer.event.prompt();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InfoView);
