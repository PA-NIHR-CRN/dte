const getEthnicities = (content: any) => ({
  asian: {
    longName: content["reusable-asian"],
    shortName: "asian",
    description: content["register2-ethnic-background-asian-description"],
    backgrounds: ["Bangladeshi", "Chinese", "Indian", "Pakistani"],
    additionalDesc: "asian",
  },
  black: {
    longName: content["reusable-black"],
    shortName: "black",
    description: content["register2-ethnic-background-black-description"],
    backgrounds: ["African", "Black British", "Caribbean"],
    additionalDesc: "black",
  },
  mixed: {
    longName: content["reusable-mixed"],
    shortName: "mixed",
    description: content["register2-ethnic-background-mixed-description"],
    backgrounds: ["Asian and White", "Black African and White", "Black Caribbean and White"],
    additionalDesc: content["register2-ethnic-background-mixed-short"],
  },
  white: {
    longName: content["reusable-white"],
    shortName: "white",
    description: content["register2-ethnic-background-white-description"],
    backgrounds: ["British, English, Northern Irish, Scottish, or Welsh", "Irish", "Irish Traveller", "Roma"],

    additionalDesc: "white",
  },
  other: {
    longName: content["reusable-other"],
    shortName: "other",
    description: content["register2-ethnic-background-arab-description"],
    backgrounds: ["Arab"],
    additionalDesc: "other",
  },
});

export default getEthnicities;
