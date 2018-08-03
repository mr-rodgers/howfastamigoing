import { Observable, interval } from "rxjs";
import { map } from "rxjs/operators";

const defaultCoords = {
  latitude: 47.0758333,
  longitude: 15.418928500000002
};

export function locationStream() {
  return streamFrom(defaultCoords);
}

function streamFrom(seed) {
  seed = { ...seed };
  return interval(1000).pipe(
    map(() => {
      seed.latitude += Math.random() * 0.0001;
      seed.longitude += Math.random() * 0.0001;
      return { ...seed, timestamp: Date.now() };
    })
  );
}
