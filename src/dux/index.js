import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import agent from "./agent";
import installer from "./installer";
import tracking, { trackingEpic } from "./tracking";
import settings, { settingsEpic } from "./settings";

const rootReducer = combineReducers({ agent, tracking, settings, installer });
const rootEpic = combineEpics(trackingEpic, settingsEpic);
const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
}
