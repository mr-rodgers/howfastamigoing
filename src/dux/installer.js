const ENABLE = "hfaig/installer/ENABLE";
const DISABLE = "hfaig/installer/DISABLE";

export default function(state = { event: null }, action) {
  switch (action.type) {
    case ENABLE:
      return { event: action.payload };
    case DISABLE:
      return { event: null };
    default:
      return state;
  }
}

export function enableInstall(event) {
  return { type: ENABLE, payload: event };
}

export function disableInstall() {
  return { type: DISABLE };
}
