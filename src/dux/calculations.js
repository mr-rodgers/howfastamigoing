import { Observable } from "rxjs";
import {
  skipWhile,
  switchMap,
  takeWhile,
  withLatestFrom
} from "rxjs/operators";
import { ofType } from "redux-observable";

const TRACK = "hfaig/calculations/TRACK";
const STOP_TRACKING = "hfaig/calculations/STOP_TRACKING";
const UPDATE_SPEED = "hfaig/calculations/UPDATE_SPEED";

export default function(
  state = { recording: false, _recordingKey: null, speed: 0, started: false },
  action
) {
  switch (action.type) {
    case TRACK:
      if (action.payload) {
        return {
          ...state,
          recording: true,
          started: true,
          _recordingKey: action.payload
        };
      } else {
        return state;
      }
    case STOP_TRACKING:
      return { ...state, recording: false };
    case UPDATE_SPEED:
      return { ...state, speed: action.payload };
    default:
      return state;
  }
}

export function track() {
  return { type: TRACK, payload: null };
}
export function stopTracking() {
  return { type: STOP_TRACKING, payload: null };
}
export function updateSpeed(speed) {
  return { type: UPDATE_SPEED, payload: speed };
}

function startEpic(action$, state$) {
  return action$.pipe(
    ofType(TRACK),
    withLatestFrom(state$),
    takeWhile(([, state]) => state.agent.geolocation),
    skipWhile(([, state]) => state.calculations.recording),
    switchMap(() =>
      Observable.create(observer => {
        try {
          const payload = navigator.geolocation.watchPosition(
            position => observer.next(position),
            error => observer.error(error),
            { enableHighAccuracy: true }
          );
          observer.next({ type: TRACK, payload });
        } catch (err) {
          observer.error(err);
          observer.next({ type: STOP_TRACKING });
          observer.complete();
        }
      }).pipe()
    )
  );
}
