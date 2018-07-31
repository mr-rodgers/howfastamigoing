import { combineReducers } from "redux";

import agent from "./agent";
import settings from "./settings";

export default combineReducers({ agent, settings });
