type deg = number;
export const calculateDistance = (
  fromLat: deg,
  fromLng: deg,
  toLat: deg,
  toLng: deg
) => {
  let radius = 6371; // Earth radius km
  let lat = (toLat - fromLat) * (Math.PI / 180);
  let lon = (toLng - fromLng) * (Math.PI / 180);
  let a =
    Math.sin(lat / 2) * Math.sin(lat / 2) +
    Math.cos(degreesToRad(fromLat)) *
      Math.cos(degreesToRad(toLat)) *
      Math.sin(lon / 2) *
      Math.sin(lon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // We have the distance in meters
  let distanceKm = radius * c * 1000;
  // Return distance in m to nautical miles
  return distanceKm * 0.000539957;
};

const degreesToRad = (val: number) => {
  return val * (Math.PI / 180);
};
