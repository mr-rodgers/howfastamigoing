import { pickBy, each, mapValues } from "lodash";
import { tap, ignoreElements } from "rxjs/operators";
import { ofType } from "redux-observable";

const UPDATE = "hfaig/settings/UPDATE";

const defaultSettings = {
  samplingDuration: 30000,
  tripMaxIdleTime: 40000,
  tripDataRetentionWindow: 3600000
};

export default function(state = defaultSettings, action) {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function updateSettings({
  samplingDuration,
  tripMaxIdleTime,
  tripDataRetentionWindow
}) {
  return {
    type: UPDATE,
    payload: pickBy({
      samplingDuration,
      tripMaxIdleTime,
      tripDataRetentionWindow
    })
  };
}

export function loadSettings() {
  return updateSettings(
    mapValues(defaultSettings, (val, key) => {
      const newVal = window.localStorage.getItem(key);
      if (newVal !== null) {
        val = JSON.parse(newVal);
      }
      return val;
    })
  );
}

function autoSaveSettingsEpic(action$, state$) {
  return action$.pipe(
    ofType(UPDATE),
    tap(({ payload: settings }) => {
      each(settings, (val, key) =>
        window.localStorage.setItem(key, JSON.stringify(val))
      );
    }),
    ignoreElements()
  );
}

export const settingsEpic = autoSaveSettingsEpic;
