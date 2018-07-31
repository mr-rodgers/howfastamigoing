export const updateAgentProps = () => ({
  type: "UPDATE_AGENT_PROPS",
  payload: { geolocation: "geolocation" in navigator }
});
