export default (
  state = {
    samplingDuration: 10000,
    tripMaxIdleTime: 120000,
    tripDataRetentionWindow: 3600000
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_SETTINGS":
      return { ...action.payload };
    default:
      return state;
  }
};
