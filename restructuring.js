import Astronomy from "./astronomy.js";

// Human design gate system starts from 2° aquarius (gate 41)
// Each astrology modality have same degree https://genekeys.onedoorland.com/astrology/
const HD_GATES = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 
  20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 
  46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60
];

// Channel name from https://humandesign.tools/
const HD_CHANNELS = {
  C18: {
    id: 18,
    name: "1 - 8 : Inspiration",
    center: ["throat", "g"]
  },
  C214: {
    id: 214,
    name: "2 - 14 : The Beat",
    center: ["sacral", "g"]
  },
  C360: {
    id: 360,
    name: "3 - 60 : Mutation",
    center: ["sacral", "root"]
  },
  C463: {
    id: 463,
    name: "4 - 63 : Logic",
    center: ["ajna", "head"]
  },
  C515: {
    id: 515,
    name: "5 - 15 : Rhythm",
    center: ["sacral", "g"]
  },
  C659: {
    id: 659,
    name: "6 - 59 : Intimacy",
    center: ["sacral", "solar plexus"]
  },
  C731: {
    id: 731,
    name: "7 - 31 : The Alpha",
    center: ["g", "throat"]
  },
  C952: {
    id: 952,
    name: "9 - 52 : Concentration",
    center: ["sacral", "root"]
  },
  C1020: {
    id: 1020,
    name: "10 - 20 : Awakening",
    center: ["g", "throat"]
  },
  C1034: {
    id: 1034,
    name: "10 - 34 : Exploration",
    center: ["g", "sacral"]
  },
  C1057: {
    id: 1057,
    name: "10 - 57 : Perfected Form",
    center: ["g", "spleen"]
  },
  C1156: {
    id: 1156,
    name: "11 - 56 : Curiosity",
    center: ["throat", "ajna"]
  },
  C1222: {
    id: 1222,
    name: "12 - 22 : Openness",
    center: ["throat", "solar plexus"]
  },
  C1333: {
    id: 1333,
    name: "13 - 33 : The Prodigal",
    center: ["throat", "g"]
  },
  C1648: {
    id: 1648,
    name: "16 - 48 : The Wavelength",
    center: ["throat", "spleen"]
  },
  C1762: {
    id: 1762,
    name: "17 - 62 : Acceptance",
    center: ["throat", "ajna"]
  },
  C1858: {
    id: 1858,
    name: "18 - 58 : Judgement",
    center: ["spleen", "root"]
  },
  C1949: {
    id: 1949,
    name: "19 - 49 : Synthesis channel",
    center: ["solar plexus", "root"]
  },
  C2034: {
    id: 2034,
    name: "20 - 34 : Charisma",
    center: ["throat", "sacral"]
  },
  C2057: {
    id: 2057,
    name: "20 - 57 : The Brainwave",
    center: ["throat", "spleen"]
  },
  C2145: {
    id: 2145,
    name: "21 - 45 : The Money Line",
    center: ["throat", "ego"]
  },
  C2343: {
    id: 2343,
    name: "23 - 43 : Structuring",
    center: ["throat", "ajna"]
  },
  C2461: {
    id: 2461,
    name: "24 - 61 : Awareness",
    center: ["head", "ajna"]
  },
  C2551: {
    id: 2551,
    name: "25 - 51 : Initiation",
    center: ["ego", "g"]
  },
  C2644: {
    id: 2644,
    name: "26 - 44 : Surrender",
    center: ["ego", "spleen"]
  },
  C2750: {
    id: 2750,
    name: "27 - 50 : Preservation",
    center: ["sacral", "spleen"]
  },
  C2838: {
    id: 2838,
    name: "28 - 38 : Struggle",
    center: ["root", "spleen"]
  },
  C2946: {
    id: 2946,
    name: "29 - 46 : Discovery",
    center: ["g", "sacral"]
  },
  C3041: {
    id: 3041,
    name: "30 - 41 : Recognition",
    center: ["root", "solar plexus"]
  },
  C3254: {
    id: 3254,
    name: "32 - 54 : Transformation",
    center: ["root", "spleen"]
  },
  C3457: {
    id: 3457,
    name: "34 - 57 : Power",
    center: ["sacral", "spleen"]
  },
  C3536: {
    id: 3536,
    name: "35 - 36 : Transitoriness",
    center: ["throat", "solar plexus"]
  },
  C3740: {
    id: 3740,
    name: "37 - 40 : Community",
    center: ["ego", "solar plexus"]
  },
  C3955: {
    id: 3955,
    name: "39 - 55 : Emoting",
    center: ["root", "solar plexus"]
  },
  C4253: {
    id: 4253,
    name: "42 - 53 : Maturation",
    center: ["root", "sacral"]
  },
  C4764: {
    id: 4764,
    name: "47 - 64 : Abstraction",
    center: ["ajna", "head"]
  },
}

const MOTORIZED_THROAT = {
  L1: [2145, 1222, 3536, 2034],
  L2: [
    [[2551, 515, 214, 2946], [1333, 18, 731, 1020]],
    [[2644, 2750, 3254, 2838, 1858], [1648, 2057]],
    [[1034], [18, 731, 1333]],
    [[2644, 2750, 3254, 2838, 1858], [1057], [18, 731, 1333]]
  ]
};

// Inspired by jdempcy/hdkit github
function degreeToHd (degree) {
  let adjustedDegree = degree;

  // for additional 180°
  if (adjustedDegree > 360) adjustedDegree = adjustedDegree - 360
  else if (adjustedDegree < 0) adjustedDegree = adjustedDegree + 360

  // The distance between 0° Aries to 2° Aquarius is 58° backward
  adjustedDegree += 58;
  if (adjustedDegree > 360) adjustedDegree -= 360;

  const percentageThrough = adjustedDegree / 360;

  // Gate
  const gate = HD_GATES[parseInt(percentageThrough * 64)];

  // Line
  const exactLine = 64 * 6 * percentageThrough;
  const line = (exactLine % 6) + 1;

  // Color
  const exactColor = 64 * 6 * 6 * percentageThrough;
  const color = (exactColor % 6) + 1;

  // Tone
  const exactTone = 64 * 6 * 6 * 6 * percentageThrough;
  const tone = (exactTone % 6) + 1;

  // Base
  // Base only has 5 bases https://www.jovianarchive.com/Stories/16/Substructure_and_Birth_Time
  const exactBase = 64 * 6 * 6 * 6 * 5 * percentageThrough;
  const base = (exactBase % 5) + 1;

  return {
    gate,
    line: parseInt(line),
    color: parseInt(color),
    tone: parseInt(tone),
    base: parseInt(base),
  }
}

function hdCreation (date, isDesign = false) {
  const designDate = Astronomy.birthToDesignDate(date)

  const sunDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "sun");
  const sun = degreeToHd(sunDegree);
  const earth = degreeToHd(sunDegree + 180);

  const nodeDegree = Astronomy.lunarNode(isDesign ? designDate : date);
  const northNode = degreeToHd(nodeDegree);
  const southNode = degreeToHd(nodeDegree + 180);

  const moonDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "moon");
  const moon = degreeToHd(moonDegree);
  
  const mercuryDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "mercury");
  const mercury = degreeToHd(mercuryDegree);
  
  const venusDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "venus");
  const venus = degreeToHd(venusDegree);
  
  const marsDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "mars");
  const mars = degreeToHd(marsDegree);
  
  const jupiterDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "jupiter");
  const jupiter = degreeToHd(jupiterDegree);
  
  const saturnDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "saturn");
  const saturn = degreeToHd(saturnDegree);
  
  const uranusDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "uranus");
  const uranus = degreeToHd(uranusDegree);
  
  const neptuneDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "neptune");
  const neptune = degreeToHd(neptuneDegree);
  
  const plutoDegree = Astronomy.geoVectorToLongitude(isDesign ? designDate : date, "pluto");
  const pluto = degreeToHd(plutoDegree);

  return {
    sun,
    earth,
    northNode,
    southNode,
    moon,
    mercury,
    venus,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
  };
}

function isMotorizedThroat(channelIds) {
  function condition (channel) { return channelIds.includes(channel); }

  if (MOTORIZED_THROAT.L1.some(channel => condition(channel))) {
    return true;
  }

  const L2 = MOTORIZED_THROAT.L2.some(connection => (
    connection.every(channel => channel.some(c => condition(c)))
  ))
  if (L2) {
    return true
  }

  return false
}

function chartInfo(personality, design, option = {
  centers: false,
  channels: false,
  gates: false,
  variables: false,
  basic: false,
}) {
  const output = {
    // centers: null,
    // channels: channels.map(x => ({id: x.id, name: x.name})),
    // gates: null,
    // variables: null,
    // basic: {
    //   type,
    //   authority,
    //   cross,
    //   profile,
    // }
  };

  if(option.variables) {
    // Variables
    const variables = {
      digestion: {
        arrow: design.sun.tone > 3 ? "R" : "L",
        color: design.sun.color,
        tone: design.sun.tone,
      },
      environment: {
        arrow: design.northNode.tone > 3 ? "R" : "L",
        color: design.northNode.color,
        tone: design.northNode.tone,
      },
      motivation: {
        arrow: personality.sun.tone > 3 ? "R" : "L",
        color: personality.sun.color,
        tone: personality.sun.tone,
      },
      perspective: {
        arrow: personality.northNode.tone > 3 ? "R" : "L",
        color: personality.northNode.color,
        tone: personality.northNode.tone,
      },
    };
    output.variables = variables;
  }

  delete option.variables;

  let hdGates = null;
  let channels = null;
  let centers = null;

  if (Object.values(option).some(e => e)) {
    hdGates = [...Object.values(personality), ...Object.values(design)]
    hdGates = hdGates.sort((a, b) =>{
      if (a.gate > b.gate) return 1
      if (a.gate < b.gate) return -1
      return 0
    })
  }

  if (option.channels || option.centers || option.basic) {
    // Channels with center Info
    channels = hdGates.reduce((prev, cur, idx) => {
      const prevChannels = [...prev];
      hdGates.map((g, i) => {
        if (i > idx && g !== cur) {
          const channel = HD_CHANNELS['C' + cur.gate + g.gate];
          if (!!channel && !prevChannels.includes(channel)) {
            prevChannels.push(channel);
          }
        }
      });
      return prevChannels;
    }, []);
  }

  if (option.gates) {
    // Gates definition
    const duplicateGates = hdGates.reduce((a, e) => {
      a[e.gate] = ++a[e.gate] || 0;
      return a;
    }, {});
    const gates = {
      quantum: [...new Set(hdGates.filter(e => duplicateGates[e.gate]).map(e => e.gate))],
      personality: Object.values(personality).filter(e => duplicateGates[e.gate] === 0).map(e => e.gate),
      design: Object.values(design).filter(e => duplicateGates[e.gate] === 0).map(e => e.gate),
    }
    output.gates = gates
  }

  if (option.channels) {
    output.channels = channels.map(x => ({id: x.id, name: x.name}))
  }

  if (option.centers || option.basic) {
    // Centers
    const dumpCenter = channels.reduce((prev, cur) => ([...prev, ...cur.center]), []);
    centers = [...new Set(dumpCenter)].sort();
    output.centers = centers;
  }

  if (option.basic) {
    // Basic info
    const channelIds = channels.reduce((prev, cur) => ([...new Set([...prev, cur.id])]), []);
    const motorizedThroat = isMotorizedThroat(channelIds);
    let type = null;
    let authority = null;
    const cross = `${personality.sun.gate}/${personality.earth.gate} | ${design.sun.gate}/${design.earth.gate}`;
    const profile = `${personality.sun.line}/${design.sun.line}`;

    // find type and authority
    if (centers.includes("sacral")) {
      if (motorizedThroat) {
        type = "manifesting generator";
      } else {
        type = "generator";
      }
  
      if (centers.includes("solar plexus")) {
        authority = "emotional";
      } else {
        authority = "sacral";
      }
    } else {
      if (motorizedThroat) {
        type = "manifestor";
      } else if (centers.length > 0) {
        type = "projector";
      } else {
        type = "reflector";
      }
  
      if (centers.includes("solar plexus")) {
        authority = "emotional";
      } else if (centers.includes("spleen")) {
        authority = "splenic";
      } else if (centers.includes("ego")) {
        authority = "ego";
      } else if (centers.includes("g")) {
        authority = "self-projected";
      } else if (centers.includes("ajna")) {
        authority = "environment";
      } else {
        authority = "lunar";
      }
    }

    // TODO: find the definition

    output.basic = {
      type,
      authority,
      cross,
      profile,
      definition: "Work In Progress"
    }
  }
  return output;
};

export default {
  hdCreation,
  chartInfo,
};