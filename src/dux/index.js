import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import agent from "./agent";
import tracking, { trackingEpic } from "./tracking";
import settings from "./settings";

const rootReducer = combineReducers({ agent, tracking, settings });
const rootEpic = combineEpics(trackingEpic);
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
