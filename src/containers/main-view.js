import { connect } from "react-redux";

import MainView from "../components/main-view";

import { locationStream } from "../mock/locations";

const mapStateToProps = ({ tracking }) => ({
  value: tracking.currentSpeed
});

export default connect(mapStateToProps)(MainView);
