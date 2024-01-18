import mapParticipantDisabilityDesc, { DisabilityContent } from "./mapParticipantDisabilityDesc";

describe("mapParticipantDisabilityDesc", () => {
  const mockContent = {
    "register2-disability2-input-yes-lots": "content for yes lots",
    "register2-disability2-input-yes-little": "content for yes little",
    "register2-disability2-input-not-at-all": "content for not at all",
    "register2-disability2-aria-prefer-not-say": "content for prefer not to say",
    "reusable-other": "fallback content",
  };

  it("should return correct content for YesLots key", () => {
    expect(mapParticipantDisabilityDesc(DisabilityContent.YesLots, mockContent)).toBe("content for yes lots");
  });

  it("should return correct content for YesLittle key", () => {
    expect(mapParticipantDisabilityDesc(DisabilityContent.YesLittle, mockContent)).toBe("content for yes little");
  });

  it("should return correct content for NotAtAll key", () => {
    expect(mapParticipantDisabilityDesc(DisabilityContent.NotAtAll, mockContent)).toBe("content for not at all");
  });

  it("should return correct content for PreferNotToSay key", () => {
    expect(mapParticipantDisabilityDesc(DisabilityContent.PreferNotToSay, mockContent)).toBe(
      "content for prefer not to say"
    );
  });

  it("should return reusable-other content for empty key", () => {
    expect(mapParticipantDisabilityDesc("", mockContent)).toBe("fallback content");
  });

  it("should return the provided key if it is not in the enum", () => {
    expect(mapParticipantDisabilityDesc("random string", mockContent)).toBe("random string");
  });
});
