import Restructuring from "./restructuring.js";

function hdkit (date = new Date(), option = {
  raw: true,
  centers: false,
  channels: false,
  gates: false,
  variables: false,
  basic: false,
}) {
  if (!Object.values(option).some(e => e)) {
    throw new Error("Please choose at least one data from the option!");
  }
  const personality = Restructuring.hdCreation(date);
  const design = Restructuring.hdCreation(date, true);
  let data = {}
  if (option.raw) {
    data.personality = personality;
    data.design = design;
  }

  delete option.raw;

  if (Object.values(option).some(e => e)) {
    data = {...data, ...Restructuring.chartInfo(personality, design, option)};
  }
  data.notes = "North Node and South Node is still an experimental code."
  return data;
};

export default hdkit;