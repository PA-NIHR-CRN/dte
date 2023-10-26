import mapMonthDescription, { Months } from "./mapParticipantDobMonths";

describe("mapMonthDescription", () => {
  const mockContent = {
    "month-january": "content for January",
    "month-february": "content for February",
    "month-march": "content for March",
    "month-april": "content for April",
    "month-may": "content for May",
    "month-june": "content for June",
    "month-july": "content for July",
    "month-august": "content for August",
    "month-september": "content for September",
    "month-october": "content for October",
    "month-november": "content for November",
    "month-december": "content for December",
  };

  Object.values(Months).forEach((month) => {
    it(`should return correct content for ${month}`, () => {
      expect(mapMonthDescription(month, mockContent)).toBe(`content for ${month}`);
    });
  });

  it("should return undefined for a key not in the enum", () => {
    expect(mapMonthDescription("random string", mockContent)).toBeUndefined();
  });
});
