import GreatCircle from "great-circle";
import { sortBy, filter } from "lodash";

const slidingWindowSize = 2;

export function processMeasurement(measures, measure, settings) {
  let totalSpeed = 0;
  measures = [...(measures || []), measure].slice(slidingWindowSize * -1);

  for (let i = 0; i < measures.length - 1; i++) {
    totalSpeed += calculateSpeed(measures[i], measures[i + 1]);
  }

  return {
    measurements: measures,
    speed: totalSpeed ? totalSpeed / (measures.length - 1) : 0
  };
}

function calculateSpeed(first, second) {
  const distance = greatCircleDistance(first, second);
  const timeElapsed = second.timestamp - first.timestamp;
  const msInHour = 3.6e6;
  const hoursElapsed = timeElapsed / msInHour;
  return distance / hoursElapsed;
}

function greatCircleDistance(
  { latitude: latA, longitude: longA },
  { latitude: latB, longitude: longB }
) {
  return distance(latA, longA, latB, longB, "K");
}

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}
