import { Ethnicities } from "../types/ReferenceData/Ethnicities";

const ethnicities: Ethnicities = {
  asian: {
    longName: "Asian or Asian British",
    shortName: "asian",
    description:
      "Includes any Asian background, for example, Bangladeshi, Chinese, Indian, Pakistani or other South or East Asian",
    backgrounds: ["Bangladeshi", "Chinese", "Indian", "Pakistani"],
  },
  black: {
    longName: "Black, African, Black British or Caribbean",
    shortName: "black",
    description: "Includes any Black background",
    backgrounds: ["African", "Black British", "Caribbean"],
  },
  mixed: {
    longName: "Mixed or multiple ethnic groups",
    shortName: "mixed",
    description: "Includes any Mixed background",
    backgrounds: [
      "Asian and White",
      "Black African and White",
      "Black Caribbean and White",
    ],
  },
  white: {
    longName: "White",
    shortName: "white",
    description: "Includes any White background",
    backgrounds: [
      "British, English, Northern Irish, Scottish, or Welsh",
      "Irish",
      "Irish Traveller or Gypsy",
    ],
  },
  other: {
    longName: "Other ethnic group",
    shortName: "other",
    description: "Includes Arab",
    backgrounds: ["Arab"],
  },
};

export default ethnicities;
