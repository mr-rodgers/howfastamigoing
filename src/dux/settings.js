const UPDATE = "hfaig/settings/UPDATE";

export default function(
  state = {
    samplingDuration: 10000,
    tripMaxIdleTime: 120000,
    tripDataRetentionWindow: 3600000
  },
  action
) {
  switch (action.type) {
    case UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
}

export function updateSettings(
  samplingDuration,
  tripMaxIdleTime,
  retentionWindow
) {
  return {
    type: UPDATE,
    payload: { samplingDuration, tripMaxIdleTime, retentionWindow }
  };
}
