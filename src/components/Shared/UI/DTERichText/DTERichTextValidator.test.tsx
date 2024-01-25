import DTERichTextValidators from "./DTERichTextValidators";

describe("DTERichTextValidators validateRequired", () => {
  it("validateRequired must return false for empty string", async () => {
    const results = DTERichTextValidators.validateRequired("");
    expect(results).toBeFalsy();
  });

  it("validateRequired must return false for empty html string", async () => {
    const results = DTERichTextValidators.validateRequired("<p></p>");
    expect(results).toBeFalsy();
  });

  it("validateRequired must return true for populated html string", async () => {
    const results = DTERichTextValidators.validateRequired("<p>anything</p>");
    expect(results).toBeTruthy();
  });
});

describe("DTERichTextValidators minCharacterLength", () => {
  it("minCharacterLength must return false for empty string", async () => {
    const results = DTERichTextValidators.minCharacterLength("", 5);
    expect(results).toBeFalsy();
  });

  it("minCharacterLength must return false for empty html string", async () => {
    const results = DTERichTextValidators.minCharacterLength("<p></p>", 5);
    expect(results).toBeFalsy();
  });

  it("minCharacterLength must return false for populated html string below minimum length", async () => {
    const results = DTERichTextValidators.minCharacterLength("<p>1234</p>", 5);
    expect(results).toBeFalsy();
  });

  it("minCharacterLength must return true for populated html string equal minimum length", async () => {
    const results = DTERichTextValidators.minCharacterLength("<p>12345</p>", 5);
    expect(results).toBeTruthy();
  });

  it("minCharacterLength must return true for populated html string above minimum length", async () => {
    const results = DTERichTextValidators.minCharacterLength("<p>123456</p>", 5);
    expect(results).toBeTruthy();
  });
});

describe("DTERichTextValidators maxCharacterLength", () => {
  it("minCharacterLength must return true for empty string where max length is more than 0", async () => {
    const results = DTERichTextValidators.maxCharacterLength("", 4);
    expect(results).toBeTruthy();
  });

  it("minCharacterLength must return true for empty html string where max length is more than 0", async () => {
    const results = DTERichTextValidators.maxCharacterLength("<p></p>", 4);
    expect(results).toBeTruthy();
  });

  it("minCharacterLength must return true for populated html string below minimum length", async () => {
    const results = DTERichTextValidators.maxCharacterLength("<p>123</p>", 4);
    expect(results).toBeTruthy();
  });

  it("minCharacterLength must return true for populated html string equal minimum length", async () => {
    const results = DTERichTextValidators.maxCharacterLength("<p>1234</p>", 4);
    expect(results).toBeTruthy();
  });

  it("minCharacterLength must return false for populated html string above minimum length", async () => {
    const results = DTERichTextValidators.maxCharacterLength("<p>12345</p>", 4);
    expect(results).toBeFalsy();
  });
});

describe("DTERichTextValidators characterLengthRange", () => {
  it("characterLengthRange must return false where html string is below range", async () => {
    const results = DTERichTextValidators.characterLengthRange("<p>1</p>", 4, 6);
    expect(results).toBeFalsy();
  });

  it("characterLengthRange must return false where html string is beyond range", async () => {
    const results = DTERichTextValidators.characterLengthRange("<p>1234567</p>", 4, 6);
    expect(results).toBeFalsy();
  });

  it("characterLengthRange must return true where html string is within range", async () => {
    const results = DTERichTextValidators.characterLengthRange("<p>12345</p>", 4, 6);
    expect(results).toBeTruthy();
  });
});

describe("DTERichTextValidators isHTML", () => {
  it("isHTML must return false for empty string", async () => {
    const results = DTERichTextValidators.isHtml("");
    expect(results).toBeFalsy();
  });

  it("isHTML must return false for empty html string", async () => {
    const results = DTERichTextValidators.isHtml("<p></p>");
    expect(results).toBeTruthy();
  });

  it("isHTML must return true for populated html string", async () => {
    const results = DTERichTextValidators.isHtml("<p>anything</p>");
    expect(results).toBeTruthy();
  });
});
