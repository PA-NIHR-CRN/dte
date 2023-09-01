const getEthnicities = (content: any) => ({
  asian: {
    longName: content["reusable-asian"],
    shortName: "asian",
    description:
      "Includes any Asian background, for example, Bangladeshi, Chinese, Indian, Pakistani or other South or East Asian",
    backgrounds: ["Bangladeshi", "Chinese", "Indian", "Pakistani"],
  },
  black: {
    longName: content["reusable-black"],
    shortName: "black",
    description: "Includes any Black background",
    backgrounds: ["African", "Black British", "Caribbean"],
  },
  mixed: {
    longName: content["reusable-mixed"],
    shortName: "mixed",
    description: "Includes any Mixed background",
    backgrounds: ["Asian and White", "Black African and White", "Black Caribbean and White"],
  },
  white: {
    longName: content["reusable-white"],
    shortName: "white",
    description: "Includes any White background",
    backgrounds: ["British, English, Northern Irish, Scottish, or Welsh", "Irish", "Irish Traveller", "Roma"],
  },
  other: {
    longName: content["reusable-other"],
    shortName: "other",
    description: "Includes Arab",
    backgrounds: ["Arab"],
  },
});

export default getEthnicities;
