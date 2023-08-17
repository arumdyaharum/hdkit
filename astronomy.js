import * as Astronomy from "astronomy-engine";

const PLANETS = {
  earth: Astronomy.Body.Earth,
  sun: Astronomy.Body.Sun,
  moon: Astronomy.Body.Moon,
  mercury: Astronomy.Body.Mercury,
  venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars,
  jupiter: Astronomy.Body.Jupiter,
  saturn: Astronomy.Body.Saturn,
  uranus: Astronomy.Body.Uranus,
  neptune: Astronomy.Body.Neptune,
  pluto: Astronomy.Body.Pluto,
}

function geoVectorToLongitude (date, planet) {
  const vector = Astronomy.GeoVector(PLANETS[planet], Astronomy.MakeTime(date), true);
  let longitude = Astronomy.Ecliptic(vector).elon;
  // Convert 180 format to 360 format
  if (longitude < 0) longitude = longitude + 360;
  return longitude;
}

function birthToDesignDate (birthDate) {
  const birth = Astronomy.MakeTime(new Date(birthDate));
  const sun = Astronomy.SunPosition(birth);
  const target = ((sun.elon - 88) + 360) % 360;
  const design = Astronomy.SearchSunLongitude(target, birth.AddDays(-100), 100);
  return design.date
}

// TODO: Find the accuracy of Lunar Nodes position
function lunarNode (date) {
  const node = Astronomy.SearchMoonNode(date);
  const eclip = Astronomy.EclipticGeoMoon(node.time);
  const eclipLon = node.kind < 0 ? (eclip.lon + 180) % 360 : eclip.lon
  if (node.time.date === date) return eclipLon;
  let tempDate = new Date(date);
  let flag = true;
  let nodeBefore = node;
  while(flag) {
    tempDate.setDate(tempDate.getDate() - 10);
    nodeBefore = Astronomy.SearchMoonNode(tempDate);
    if (nodeBefore.time.date.getDate() !== node.time.date.getDate()) flag = false;
  }
  const eclipBefore = Astronomy.EclipticGeoMoon(nodeBefore.time);
  const eclipBeforeLon = nodeBefore.kind < 0 ? (eclipBefore.lon + 180) % 360 : eclipBefore.lon
  const d = Math.abs(node.time.date - nodeBefore.time.date);
  const a = Math.abs(node.time.date - date);
  const fraction = (a/d);
  let angle = eclipBeforeLon - eclipLon;
  angle = angle * fraction;
  const currentEclip = eclipLon + angle;
  // version 2 : with the constant of lunar nodes regression's rate 
  // const time = a / (365.25 * 24 * 60 * 60 * 1000);
  // const angle = 19.32 * time;
  // const currentEclip = eclipLon + angle;
  return currentEclip;
}

export default {
  birthToDesignDate,
  geoVectorToLongitude,
  lunarNode,
};