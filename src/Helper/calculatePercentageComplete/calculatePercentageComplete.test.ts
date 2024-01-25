import calculatePercentageComplete from "./calculatePercentageComplete";

describe("calculatePercentageComplete", () => {
  it("should return 0% for the first step", () => {
    expect(calculatePercentageComplete(0, 10)).toBe(0);
  });

  it("should return 50% for the middle step", () => {
    expect(calculatePercentageComplete(5, 10)).toBe(50);
  });

  it("should return 100% for the last step", () => {
    expect(calculatePercentageComplete(10, 10)).toBe(100);
  });

  it("should handle non-zero-based steps", () => {
    expect(calculatePercentageComplete(1, 10)).toBe(10);
  });

  it("should round the result", () => {
    expect(calculatePercentageComplete(1, 3)).toBe(33);
    expect(calculatePercentageComplete(2, 3)).toBe(67);
  });
});
