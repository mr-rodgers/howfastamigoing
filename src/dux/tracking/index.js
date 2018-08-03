import { Observable } from "rxjs";
import {
  filter,
  mapTo,
  switchMap,
  takeWhile,
  withLatestFrom
} from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

const TRACK = "hfaig/tracking/TRACK";
const STOP_TRACKING = "hfaig/tracking/STOP_TRACKING";
const UPDATE_SPEED = "hfaig/tracking/UPDATE_SPEED";
const PROCESS_MEASUREMENT = "hfaig/tracking/PROCESS_MEASUREMENT";

import * as logic from "./logic";

export default function(
  state = {
    tracking: false,
    trackingKey: null,
    currentSpeed: null,
    measurements: null
  },
  action
) {
  switch (action.type) {
    case TRACK:
      if (action.payload !== undefined && !action.error) {
        return { ...state, tracking: true, trackingKey: action.payload };
      } else {
        return state;
      }
    case STOP_TRACKING:
      return { ...state, tracking: false, trackingKey: null };
    default:
      return state;
  }
}

export function track() {
  return { type: TRACK };
}

export function stopTracking() {
  return { type: STOP_TRACKING };
}

export function processMeasurement(payload) {
  return { type: PROCESS_MEASUREMENT, payload };
}

function trackEpic(action$, state$) {
  return action$.pipe(
    ofType(TRACK),
    withLatestFrom(state$),
    filter(([, state]) => state.agent.geolocation),
    filter(([, state]) => state.tracking.trackingKey === null),
    switchMap(([, state]) =>
      Observable.create(observer => {
        try {
          const payload = navigator.geolocation.watchPosition(
            ({ coords: { latitude, longitude }, timestamp }) => {
              observer.next({
                type: PROCESS_MEASUREMENT,
                payload: { latitude, longitude, timestamp }
              });
            },
            error =>
              observer.next({
                type: PROCESS_MEASUREMENT,
                payload: error,
                error: true
              }),
            { enableHighAccuracy: true }
          );
          observer.next({ type: TRACK, payload });
        } catch (err) {
          observer.next({ type: TRACK, payload: error, error: true });
          observer.complete();
        }
      })
    )
  );
}

function autoStopTracking(action$, state$) {
  return action$.pipe(
    filter(action => action.type === TRACK && action.error === true),
    withLatestFrom(state$),
    filter(([, state]) => state.trips.tracking),
    mapTo(stopTracking())
  );
}

export const trackingEpic = trackEpic; // combineEpics(trackEpic, autoStopTracking);
