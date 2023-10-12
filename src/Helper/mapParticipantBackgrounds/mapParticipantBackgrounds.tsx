export enum EthnicBackground {
  Bangladeshi = "Bangladeshi",
  Chinese = "Chinese",
  Indian = "Indian",
  Pakistani = "Pakistani",
  African = "African",
  BlackBritish = "Black British",
  Caribbean = "Caribbean",
  AsianAndWhite = "Asian and White",
  BlackAfricanAndWhite = "Black African and White",
  BlackCaribbeanAndWhite = "Black Caribbean and White",
  BritishEnglishNorthernIrishScottishOrWelsh = "British, English, Northern Irish, Scottish, or Welsh",
  Irish = "Irish",
  IrishTraveller = "Irish Traveller",
  Roma = "Roma",
  Arab = "Arab",
}

const mapParticipantBackgrounds = (background: string, content: any) => {
  const backgrounds: Record<EthnicBackground, any> = {
    [EthnicBackground.Bangladeshi]: content["register2-ethnic-background-bangladeshi"],
    [EthnicBackground.Chinese]: content["register2-ethnic-background-chinese"],
    [EthnicBackground.Indian]: content["register2-ethnic-background-indian"],
    [EthnicBackground.Pakistani]: content["register2-ethnic-background-pakistani"],
    [EthnicBackground.African]: content["register2-ethnic-background-african"],
    [EthnicBackground.BlackBritish]: content["register2-ethnic-background-black-british"],
    [EthnicBackground.Caribbean]: content["register2-ethnic-background-carribean"],
    [EthnicBackground.AsianAndWhite]: content["register2-ethnic-background-asian-white"],
    [EthnicBackground.BlackAfricanAndWhite]: content["register2-ethnic-background-black-african-white"],
    [EthnicBackground.BlackCaribbeanAndWhite]: content["register2-ethnic-background-black-carribean-white"],
    [EthnicBackground.BritishEnglishNorthernIrishScottishOrWelsh]: content["register2-ethnic-background-british"],
    [EthnicBackground.Irish]: content["register2-ethnic-background-irish"],
    [EthnicBackground.IrishTraveller]: content["register2-ethnic-background-irish-traveller"],
    [EthnicBackground.Roma]: content["register2-ethnic-background-roma"],
    [EthnicBackground.Arab]: content["register2-ethnic-background-arab"],
  };

  const enumValues = Object.values(EthnicBackground);

  if (!background) {
    return content["reusable-other"];
  }

  if (!enumValues.includes(background as EthnicBackground)) return background;

  return backgrounds[background as EthnicBackground];
};

export default mapParticipantBackgrounds;
