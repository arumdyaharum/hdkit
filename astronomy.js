import * as Astronomy from "astronomy-engine";
import julian from "julian";

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

// TODO: Find a current Lunar Nodes position
function lunarNode (date) {
  const node = Astronomy.SearchMoonNode(date);
  let tempDate = new Date(date);
  let flag = true;
  let nodeBefore = node;
  while(flag) {
    tempDate.setDate(tempDate.getDate() - 5);
    nodeBefore = Astronomy.SearchMoonNode(tempDate);
    if (nodeBefore.time.date.getDate() !== node.time.date.getDate()) flag = false;
  }
  const eclip = Astronomy.EclipticGeoMoon(node.time);
  const eclipBefore = Astronomy.EclipticGeoMoon(nodeBefore.time);
  const q = Math.abs(date - nodeBefore.time.date);
  const d = Math.abs(node.time.date - nodeBefore.time.date);
  const fraction = (q/d);
  const currentElon = (eclip.lon - eclipBefore.lon) * (fraction / 100);
  return nodeBefore.kind > node.kind ? eclip.lon + 180 - currentElon : eclip.lon - currentElon;
}

export default {
  birthToDesignDate,
  geoVectorToLongitude,
  lunarNode,
};