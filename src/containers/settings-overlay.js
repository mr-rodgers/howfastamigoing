import { connect } from "react-redux";

import SettingsOverlay from "../components/settings-overlay";
import { updateSettings } from "../dux/settings";

const mapStateToProps = ({ settings }) => ({
  ...settings
});

const mapDispatchToProps = dispatch => ({
  updateTripDataRetentionWindow: tripDataRetentionWindow => {
    console.log("retention", tripDataRetentionWindow);
    dispatch(updateSettings({ tripDataRetentionWindow }));
  },
  updateTripMaxIdleTime: tripMaxIdleTime => {
    console.log("idle time", tripMaxIdleTime);
    dispatch(updateSettings({ tripMaxIdleTime }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsOverlay);
