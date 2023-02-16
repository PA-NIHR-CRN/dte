export interface Ethnicity {
  longName: string;
  shortName: string;
  description: string;
  backgrounds: string[];
}

export interface Ethnicities extends Record<string, Ethnicity> {
  asian: Ethnicity;
  black: Ethnicity;
  mixed: Ethnicity;
  white: Ethnicity;
  other: Ethnicity;
}
