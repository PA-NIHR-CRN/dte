import validatePassword, { PasswordPolicy } from "./passwordValidation";
import weakPasswords from "../../data/weakPassword";

describe("validatePassword", () => {
  const policy: PasswordPolicy = {
    minimumLength: 12,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    requireUppercase: true,
    allowedPasswordSymbols: "^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    weakPasswords,
  };
  const content = {
    "register-password-policy-builder-least-chars-long": "is at least {{chars}} characters long",
    "register-password-policy-builder-includes-lowercase": "includes 1 lowercase letter",
    "register-password-policy-builder-includes-capital": "includes 1 capital letter",
    "register-password-policy-builder-includes-number": "includes 1 number",
    "register-password-policy-builder-symbol-list": "only includes symbols from this list",
    "register-password-policy-builder-symbol-includes": "includes 1 symbol",
    "register-password-policy-builder-include-no-spaces": "does not include spaces",
    "register-password-policy-builder-common-passwords": "is not a commonly used password",
    "register-password-policy-builder-enter-password-new": "Enter a new password that:",
    "register-password-policy-builder-enter-password": "Enter a password that:",
  };
  describe.each([
    [
      "1",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol",
    ],
    [
      "a",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol",
    ],
    [
      "A",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol",
    ],
    [
      "!",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number",
    ],
    [
      " ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "1a",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol",
    ],
    [
      "1A",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 symbol",
    ],
    [
      "1!",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter",
    ],
    [
      "1 ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "aA",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol",
    ],
    [
      "a!",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number",
    ],
    [
      "l ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "A!",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number",
    ],
    [
      "A ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "! ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["1aB", "Enter a password that:\n" + "• is at least 12 characters long\n" + "• includes 1 symbol"],
    ["1A!", "Enter a password that:\n" + "• is at least 12 characters long\n" + "• includes 1 lowercase letter"],
    [
      "1! ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• does not include spaces",
    ],
    ["1a!", "Enter a password that:\n" + "• is at least 12 characters long\n" + "• includes 1 capital letter"],
    [
      "1a ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "1A ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    ["fG!", "Enter a password that:\n" + "• is at least 12 characters long\n" + "• includes 1 number"],
    [
      "f! ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    [
      "C! ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["1aB!", "Enter a password that:\n" + "• is at least 12 characters long"],
    [
      "1A! ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• does not include spaces",
    ],
    [
      "1a! ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• does not include spaces",
    ],
    [
      "1aG ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "aV! ",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["1aS! ", "Enter a password that:\n" + "• is at least 12 characters long\n" + "• does not include spaces"],
    ["passwordElephant!", "Enter a password that:\n" + "• includes 1 number"],
    ["password Elephant!", "Enter a password that:\n" + "• includes 1 number\n" + "• does not include spaces"],
    ["PASSWORDELEPHANT1!", "Enter a password that:\n" + "• includes 1 lowercase letter"],
    [
      "PASSWORD ELEPHANT1!",
      "Enter a password that:\n" + "• includes 1 lowercase letter\n" + "• does not include spaces",
    ],
    ["passwordelephant1!", "Enter a password that:\n" + "• includes 1 capital letter"],
    ["password elephant1!", "Enter a password that:\n" + "• includes 1 capital letter\n" + "• does not include spaces"],
    ["passwordElephant1", "Enter a password that:\n" + "• includes 1 symbol"],
    ["password Elephant1", "Enter a password that:\n" + "• includes 1 symbol\n" + "• does not include spaces"],
    ["PASSWORDELEPHANT!", "Enter a password that:\n" + "• includes 1 lowercase letter\n" + "• includes 1 number"],
    [
      "PASSWORD ELEPHANT!",
      "Enter a password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["1234567890!!", "Enter a password that:\n" + "• includes 1 lowercase letter\n" + "• includes 1 capital letter"],
    [
      "12345 67890!!",
      "Enter a password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• does not include spaces",
    ],
    ["ELEPHANTPASSWORD1", "Enter a password that:\n" + "• includes 1 lowercase letter\n" + "• includes 1 symbol"],
    [
      "ELEPHANT PASSWORD1",
      "Enter a password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    ["elephantpassword!", "Enter a password that:\n" + "• includes 1 capital letter\n" + "• includes 1 number"],
    [
      "elephant password!",
      "Enter a password that:\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["elephantpassword1", "Enter a password that:\n" + "• includes 1 capital letter\n" + "• includes 1 symbol"],
    [
      "elephant password1",
      "Enter a password that:\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    ["elephantPassword!", "Enter a password that:\n" + "• includes 1 number"],
    ["elephant Password!", "Enter a password that:\n" + "• includes 1 number\n" + "• does not include spaces"],
    ["ELEPHANTPASSWORD1!", "Enter a password that:\n" + "• includes 1 lowercase letter"],
    [
      "ELEPHANT PASSWORD1!",
      "Enter a password that:\n" + "• includes 1 lowercase letter\n" + "• does not include spaces",
    ],
    ["elephantpassword1!", "Enter a password that:\n" + "• includes 1 capital letter"],
    ["elephant password1!", "Enter a password that:\n" + "• includes 1 capital letter\n" + "• does not include spaces"],
    ["elephantPassword1", "Enter a password that:\n" + "• includes 1 symbol"],
    ["elephant Password1", "Enter a password that:\n" + "• includes 1 symbol\n" + "• does not include spaces"],
    ["elephantPassword1! ", "Enter a password that:\n" + "• does not include spaces"],
    [
      "Pass1!£",
      "Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "ElephantPassword!£",
      "Enter a password that:\n" +
        "• includes 1 number\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "ELEPHANTPASSWORD1!£",
      "Enter a password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "elephantpassword1!£",
      "Enter a password that:\n" +
        "• includes 1 capital letter\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "ElephantPassword1£",
      "Enter a password that:\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "elephantPassword1!£",
      "Enter a password that:\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "elephantPassword1!£ ",
      "Enter a password that:\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -\n" +
        "• does not include spaces",
    ],
  ])("Validation must show correct error message", (password, expectedError) => {
    test(`for ${password}, returns ${expectedError}`, async () => {
      const result = validatePassword(password, policy, content);
      expect(result).toBe(expectedError);
    });
  });

  describe.each([
    [
      "1",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol",
    ],
    [
      "a",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol",
    ],
    [
      "A",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol",
    ],
    [
      "!",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number",
    ],
    [
      " ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "1a",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol",
    ],
    [
      "1A",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 symbol",
    ],
    [
      "1!",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter",
    ],
    [
      "1 ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "aA",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol",
    ],
    [
      "a!",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number",
    ],
    [
      "l ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "A!",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number",
    ],
    [
      "A ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "! ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["1aB", "Enter a new password that:\n" + "• is at least 12 characters long\n" + "• includes 1 symbol"],
    ["1A!", "Enter a new password that:\n" + "• is at least 12 characters long\n" + "• includes 1 lowercase letter"],
    [
      "1! ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• does not include spaces",
    ],
    ["1a!", "Enter a new password that:\n" + "• is at least 12 characters long\n" + "• includes 1 capital letter"],
    [
      "1a ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "1A ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    ["fG!", "Enter a new password that:\n" + "• is at least 12 characters long\n" + "• includes 1 number"],
    [
      "f! ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    [
      "C! ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["1aB!", "Enter a new password that:\n" + "• is at least 12 characters long"],
    [
      "1A! ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• does not include spaces",
    ],
    [
      "1a! ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 capital letter\n" +
        "• does not include spaces",
    ],
    [
      "1aG ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    [
      "aV! ",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["1aS! ", "Enter a new password that:\n" + "• is at least 12 characters long\n" + "• does not include spaces"],
    ["passwordElephant!", "Enter a new password that:\n" + "• includes 1 number"],
    ["password Elephant!", "Enter a new password that:\n" + "• includes 1 number\n" + "• does not include spaces"],
    ["PASSWORDELEPHANT1!", "Enter a new password that:\n" + "• includes 1 lowercase letter"],
    [
      "PASSWORD ELEPHANT1!",
      "Enter a new password that:\n" + "• includes 1 lowercase letter\n" + "• does not include spaces",
    ],
    ["passwordelephant1!", "Enter a new password that:\n" + "• includes 1 capital letter"],
    [
      "password elephant1!",
      "Enter a new password that:\n" + "• includes 1 capital letter\n" + "• does not include spaces",
    ],
    ["passwordElephant1", "Enter a new password that:\n" + "• includes 1 symbol"],
    ["password Elephant1", "Enter a new password that:\n" + "• includes 1 symbol\n" + "• does not include spaces"],
    ["PASSWORDELEPHANT!", "Enter a new password that:\n" + "• includes 1 lowercase letter\n" + "• includes 1 number"],
    [
      "PASSWORD ELEPHANT!",
      "Enter a new password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    [
      "1234567890!!",
      "Enter a new password that:\n" + "• includes 1 lowercase letter\n" + "• includes 1 capital letter",
    ],
    [
      "12345 67890!!",
      "Enter a new password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• does not include spaces",
    ],
    ["ELEPHANTPASSWORD1", "Enter a new password that:\n" + "• includes 1 lowercase letter\n" + "• includes 1 symbol"],
    [
      "ELEPHANT PASSWORD1",
      "Enter a new password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    ["elephantpassword!", "Enter a new password that:\n" + "• includes 1 capital letter\n" + "• includes 1 number"],
    [
      "elephant password!",
      "Enter a new password that:\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 number\n" +
        "• does not include spaces",
    ],
    ["elephantpassword1", "Enter a new password that:\n" + "• includes 1 capital letter\n" + "• includes 1 symbol"],
    [
      "elephant password1",
      "Enter a new password that:\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol\n" +
        "• does not include spaces",
    ],
    ["elephantPassword!", "Enter a new password that:\n" + "• includes 1 number"],
    ["elephant Password!", "Enter a new password that:\n" + "• includes 1 number\n" + "• does not include spaces"],
    ["ELEPHANTPASSWORD1!", "Enter a new password that:\n" + "• includes 1 lowercase letter"],
    [
      "ELEPHANT PASSWORD1!",
      "Enter a new password that:\n" + "• includes 1 lowercase letter\n" + "• does not include spaces",
    ],
    ["elephantpassword1!", "Enter a new password that:\n" + "• includes 1 capital letter"],
    [
      "elephant password1!",
      "Enter a new password that:\n" + "• includes 1 capital letter\n" + "• does not include spaces",
    ],
    ["elephantPassword1", "Enter a new password that:\n" + "• includes 1 symbol"],
    ["elephant Password1", "Enter a new password that:\n" + "• includes 1 symbol\n" + "• does not include spaces"],
    ["elephantPassword1! ", "Enter a new password that:\n" + "• does not include spaces"],
    [
      "Pass1!£",
      "Enter a new password that:\n" +
        "• is at least 12 characters long\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "ElephantPassword!£",
      "Enter a new password that:\n" +
        "• includes 1 number\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "ELEPHANTPASSWORD1!£",
      "Enter a new password that:\n" +
        "• includes 1 lowercase letter\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "elephantpassword1!£",
      "Enter a new password that:\n" +
        "• includes 1 capital letter\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "ElephantPassword1£",
      "Enter a new password that:\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "elephantPassword1!£",
      "Enter a new password that:\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -",
    ],
    [
      "elephantPassword1!£ ",
      "Enter a new password that:\n" +
        "• only includes symbols from this list ^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ ` = + -\n" +
        "• does not include spaces",
    ],
  ])("Validation must show correct error message for new password", (password, expectedError) => {
    test(`for ${password}, returns ${expectedError}`, async () => {
      const result = validatePassword(password, policy, content, true);
      expect(result).toBe(expectedError);
    });
  });
});
