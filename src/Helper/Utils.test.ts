import Utils from "./Utils";

describe("Utils Tests", () => {
  test("Invalid DTE status is recognised.", () => {
    expect(
      Utils.IsCPMSStatusDTEReady("This is an incorrect Status"),
    ).toBeFalsy();
  });
  test("Valid DTE status are recognised.", () => {
    const statuses = process.env?.REACT_APP_DTE_READY_STATUS_LIST?.split("#");
    if (statuses) {
      statuses.forEach((status) => {
        expect(Utils.IsCPMSStatusDTEReady(status)).toBeTruthy();
      });
    }
  });
  test("TrimFormDataFields removes whitespace", () => {
    const fieldValues: Record<string, string | boolean> = {
      prefix: "   abc",
      suffix: "abc   ",
      both: "   abc   ",
      all: "   ",
      truthy: true,
      falsy: false,
    };
    const processedData = Utils.TrimFormDataFields(fieldValues);
    expect(processedData.prefix === "abc").toBeTruthy();
    expect(processedData.suffix === "abc").toBeTruthy();
    expect(processedData.both === "abc").toBeTruthy();
    expect(processedData.all === "").toBeTruthy();
    expect(processedData.truthy).toBeTruthy();
    expect(processedData.falsy).toBeFalsy();
  });
});
