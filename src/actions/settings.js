export const updateSettings = (
  samplingDuration,
  tripMaxIdleTime,
  retentionWindow
) => ({
  type: "UPDATE_SETTINGS",
  payload: { samplingDuration, tripMaxIdleTime, retentionWindow }
});
