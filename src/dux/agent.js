const UPDATE = "hfaig/agent/UPDATE";

export default function reducer(state = { geolocation: false }, action) {
  switch (action.type) {
    case UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
}

export function updateAgentProps() {
  return {
    type: UPDATE,
    payload: { geolocation: "geolocation" in navigator }
  };
}
