const getEthnicities = (content: any) => ({
  asian: {
    longName: content["reusable-asian"],
    shortName: "asian",
    description: content["register2-ethnic-background-asian-description"],
    backgrounds: [
      content["register2-ethnic-background-bangladeshi"],
      content["register2-ethnic-background-chinese"],
      content["register2-ethnic-background-indian"],
      content["register2-ethnic-background-pakistani"],
    ],
    additionalDesc: "asian",
  },
  black: {
    longName: content["reusable-black"],
    shortName: "black",
    description: content["register2-ethnic-background-black-description"],
    backgrounds: [
      content["register2-ethnic-background-african"],
      content["register2-ethnic-background-black-british"],
      content["register2-ethnic-background-carribean"],
    ],
    additionalDesc: "black",
  },
  mixed: {
    longName: content["reusable-mixed"],
    shortName: "mixed",
    description: content["register2-ethnic-background-mixed-description"],
    backgrounds: [
      content["register2-ethnic-background-asian-white"],
      content["register2-ethnic-background-black-african-white"],
      content["register2-ethnic-background-black-carribean-white"],
    ],
    additionalDesc: content["register2-ethnic-background-mixed-short"],
  },
  white: {
    longName: content["reusable-white"],
    shortName: "white",
    description: content["register2-ethnic-background-white-description"],
    backgrounds: [
      content["register2-ethnic-background-british"],
      content["register2-ethnic-background-irish"],
      content["register2-ethnic-background-irish-traveller"],
      content["register2-ethnic-background-roma"],
    ],
    additionalDesc: "white",
  },
  other: {
    longName: content["reusable-other"],
    shortName: "other",
    description: content["register2-ethnic-background-arab-description"],
    backgrounds: [content["register2-ethnic-background-arab"]],
    additionalDesc: "other",
  },
});

export default getEthnicities;
