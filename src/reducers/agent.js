export default (state = { geolocation: false }, action) => {
  switch (action.type) {
    case "UPDATE_AGENT_PROPS":
      return { ...action.payload };
    default:
      return state;
  }
};
