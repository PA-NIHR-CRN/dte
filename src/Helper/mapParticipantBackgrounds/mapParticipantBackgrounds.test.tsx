import mapParticipantBackgrounds, { EthnicBackground } from "./mapParticipantBackgrounds";

describe("mapParticipantBackgrounds", () => {
  const mockContent = {
    "register2-ethnic-background-bangladeshi": "content for Bangladeshi",
    "register2-ethnic-background-chinese": "content for Chinese",
    "register2-ethnic-background-indian": "content for Indian",
    "register2-ethnic-background-pakistani": "content for Pakistani",
    "register2-ethnic-background-african": "content for African",
    "register2-ethnic-background-black-british": "content for Black British",
    "register2-ethnic-background-carribean": "content for Caribbean",
    "register2-ethnic-background-asian-white": "content for Asian and White",
    "register2-ethnic-background-black-african-white": "content for Black African and White",
    "register2-ethnic-background-black-carribean-white": "content for Black Caribbean and White",
    "register2-ethnic-background-british": "content for British, English, Northern Irish, Scottish, or Welsh",
    "register2-ethnic-background-irish": "content for Irish",
    "register2-ethnic-background-irish-traveller": "content for Irish Traveller",
    "register2-ethnic-background-roma": "content for Roma",
    "register2-ethnic-background-arab": "content for Arab",
    "reusable-other": "fallback content",
  };

  it("should return correct content for Bangladeshi background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Bangladeshi, mockContent)).toBe("content for Bangladeshi");
  });

  it("should return correct content for Chinese background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Chinese, mockContent)).toBe("content for Chinese");
  });

  it("should return correct content for Indian background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Indian, mockContent)).toBe("content for Indian");
  });

  it("should return correct content for Pakistani background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Pakistani, mockContent)).toBe("content for Pakistani");
  });

  it("should return correct content for African background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.African, mockContent)).toBe("content for African");
  });

  it("should return correct content for Black British background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.BlackBritish, mockContent)).toBe("content for Black British");
  });

  it("should return correct content for Caribbean background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Caribbean, mockContent)).toBe("content for Caribbean");
  });

  it("should return correct content for Asian and White background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.AsianAndWhite, mockContent)).toBe("content for Asian and White");
  });

  it("should return correct content for Black African and White background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.BlackAfricanAndWhite, mockContent)).toBe(
      "content for Black African and White"
    );
  });

  it("should return correct content for Black Caribbean and White background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.BlackCaribbeanAndWhite, mockContent)).toBe(
      "content for Black Caribbean and White"
    );
  });

  it("should return correct content for British, English, Northern Irish, Scottish, or Welsh background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.BritishEnglishNorthernIrishScottishOrWelsh, mockContent)).toBe(
      "content for British, English, Northern Irish, Scottish, or Welsh"
    );
  });

  it("should return correct content for Irish background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Irish, mockContent)).toBe("content for Irish");
  });

  it("should return correct content for Irish Traveller background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.IrishTraveller, mockContent)).toBe("content for Irish Traveller");
  });

  it("should return correct content for Roma background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Roma, mockContent)).toBe("content for Roma");
  });

  it("should return correct content for Arab background", () => {
    expect(mapParticipantBackgrounds(EthnicBackground.Arab, mockContent)).toBe("content for Arab");
  });

  it("should return reusable-other content for empty key", () => {
    expect(mapParticipantBackgrounds("", mockContent)).toBe("fallback content");
  });

  it("should return the provided key if it is not in the enum", () => {
    expect(mapParticipantBackgrounds("random string", mockContent)).toBe("random string");
  });
});
