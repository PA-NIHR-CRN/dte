export enum DisabilityContent {
  YesLots = "Yes, a lot",
  YesLittle = "Yes, a little",
  NotAtAll = "Not at all",
  PreferNotToSay = "Prefer not to say",
}

const mapParticipantDisabilityDesc = (key: string, content: any) => {
  const disabilityContent: Record<DisabilityContent, any> = {
    [DisabilityContent.YesLots]: content["register2-disability2-input-yes-lots"],
    [DisabilityContent.YesLittle]: content["register2-disability2-input-yes-little"],
    [DisabilityContent.NotAtAll]: content["register2-disability2-input-not-at-all"],
    [DisabilityContent.PreferNotToSay]: content["register2-disability2-aria-prefer-not-say"],
  };

  const enumValues = Object.values(DisabilityContent);

  if (!key) {
    return content["reusable-other"];
  }

  if (!enumValues.includes(key as DisabilityContent)) return key;

  return disabilityContent[key as DisabilityContent];
};

export default mapParticipantDisabilityDesc;
