import { Observable, interval } from "rxjs";
import { map } from "rxjs/operators";

const dummyData = [
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832380357 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832384306 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832389351 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832394372 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832399392 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832404419 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832409412 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832414453 },
  // { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832419498 },
  { latitude: 47.8112617, longitude: 16.2315159, timestamp: 1533832424516 },
  { latitude: 47.8127805, longitude: 16.2319602, timestamp: 1533832429569 },
  { latitude: 47.8119, longitude: 16.2336665, timestamp: 1533832439596 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832445199 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832450254 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832455272 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832460293 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832465314 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832470357 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832475376 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832480401 },
  { latitude: 47.8117909, longitude: 16.2300485, timestamp: 1533832485490 },
  { latitude: 47.8143539, longitude: 16.2342137, timestamp: 1533832490542 },
  { latitude: 47.8155215, longitude: 16.234897, timestamp: 1533832495551 },
  { latitude: 47.8143539, longitude: 16.2342137, timestamp: 1533832500569 },
  { latitude: 47.8154621, longitude: 16.2353066, timestamp: 1533832505597 },
  { latitude: 47.8154076, longitude: 16.2334974, timestamp: 1533832510643 },
  { latitude: 47.8155215, longitude: 16.234897, timestamp: 1533832515672 },
  { latitude: 47.8180348, longitude: 16.2350348, timestamp: 1533832520696 },
  { latitude: 47.8180348, longitude: 16.2350348, timestamp: 1533832525713 },
  { latitude: 47.8180348, longitude: 16.2350348, timestamp: 1533832530742 },
  { latitude: 47.8211866, longitude: 16.2373238, timestamp: 1533832535789 },
  { latitude: 47.8211866, longitude: 16.2373238, timestamp: 1533832540818 },
  { latitude: 47.8218893, longitude: 16.2368462, timestamp: 1533832545825 },
  { latitude: 47.8253332, longitude: 16.2393065, timestamp: 1533832550853 },
  { latitude: 47.8253332, longitude: 16.2393065, timestamp: 1533832555872 },
  { latitude: 47.8253332, longitude: 16.2393065, timestamp: 1533832560905 },
  { latitude: 47.8253332, longitude: 16.2393065, timestamp: 1533832565928 },
  { latitude: 47.8296087, longitude: 16.2360305, timestamp: 1533832570960 },
  { latitude: 47.8333452, longitude: 16.2386621, timestamp: 1533832575991 },
  { latitude: 47.8296087, longitude: 16.2360305, timestamp: 1533832581024 },
  { latitude: 47.8296087, longitude: 16.2360305, timestamp: 1533832586035 },
  { latitude: 47.8367404, longitude: 16.2370927, timestamp: 1533832591062 },
  { latitude: 47.8454074, longitude: 16.231938, timestamp: 1533832596102 },
  { latitude: 47.8454074, longitude: 16.231938, timestamp: 1533832601181 },
  { latitude: 47.8454074, longitude: 16.231938, timestamp: 1533832606163 },
  { latitude: 47.8454074, longitude: 16.231938, timestamp: 1533832611169 },
  { latitude: 47.8450261, longitude: 16.2455015, timestamp: 1533832616193 },
  { latitude: 47.8450261, longitude: 16.2455015, timestamp: 1533832621211 },
  { latitude: 47.8450261, longitude: 16.2455015, timestamp: 1533832626233 },
  { latitude: 47.8450261, longitude: 16.2455015, timestamp: 1533832631283 },
  { latitude: 47.8534572, longitude: 16.2419872, timestamp: 1533832636308 },
  { latitude: 47.8611915, longitude: 16.2367277, timestamp: 1533832641305 }
];

const defaultCoords = {
  latitude: 47.0758333,
  longitude: 15.418928500000002
};

export function locationStream() {
  let coords = dummyData.shift();
  return Observable.create(observer => {
    const popAndEmit = () => {
      coords = dummyData.shift();
      observer.next(coords);
      if (dummyData.length) {
        setTimeout(popAndEmit, dummyData[0].timestamp - coords.timestamp);
      } else {
        observer.complete();
      }
    };
    popAndEmit();
  });
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
