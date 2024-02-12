import { test } from "../../../../hooks/CustomFixtures";
import {
  assertErrorUtil,
  assertComponentsHidden,
} from "../../../../utils/visibilityUtils";

// --- Success TESTS --- //
test.describe("Successful user registration journey", () => {
  test("Successful registration journey", async ({
    namePage,
    dateOfBirthPage,
    emailPage,
    passwordPolicyPage,
    consentPage,
    emailVerificationPage,
  }) => {
    await test.step("Given I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("When I see the components correctly rendered", async () => {
      await namePage.assertTextVisible();
      await namePage.assertButtonsVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
    });
    await test.step("Then I will not see any error messages rendered", async () => {
      await assertComponentsHidden([
        namePage.firstNameError,
        namePage.lastNameError,
      ]);
    });
    await test.step("When I fill only the first name input", async () => {
      await namePage.firstNameInput.fill("firstName");
    });
    await test.step("When I press continue", async () => {
      await namePage.continueButton.click();
    });
    await test.step("I will see an error message correctly rendered", async () => {
      await assertErrorUtil(
        namePage.lastNameError,
        "Error: Enter your last name"
      );
    });
    await test.step("When I fill in the first and last name inputs", async () => {
      await namePage.lastNameInput.fill("lastName");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.continueButton.click();
    });
    await test.step("When I see the DoB page components correctly rendered", async () => {
      await dateOfBirthPage.assertButtonsVisible();
      await dateOfBirthPage.assertTextVisible();
      await dateOfBirthPage.assertFormVisible();
    });
    await test.step("And there are no errors rendered", async () => {
      await assertComponentsHidden([dateOfBirthPage.errorMessage]);
    });
    await test.step("When I fill in the form fields with an invalid month", async () => {
      await dateOfBirthPage.dayInput.fill("15");
      await dateOfBirthPage.monthInput.fill("22");
      await dateOfBirthPage.yearInput.fill("1985");
    });
    await test.step("I will press continue", async () => {
      await dateOfBirthPage.continueButton.click();
    });
    await test.step("I will then see the correct error message rendered", async () => {
      await assertErrorUtil(
        dateOfBirthPage.errorMessage,
        "Error: Month must be number between 1 and 12"
      );
    });
    await test.step("When I fill out all inputs correctly", async () => {
      await dateOfBirthPage.monthInput.fill("12");
    });
    await test.step("When I click to open the summary text I'll see it correctly rendered", async () => {
      await dateOfBirthPage.summaryTextPreview.click();
    });
    await test.step("Then I will click continue", async () => {
      await dateOfBirthPage.continueButton.click();
    });
    await test.step("When I see the email page components correctly rendered", async () => {
      await emailPage.assertButtonsVisible();
      await emailPage.assertTextVisible();
      await emailPage.assertFormVisible();
    });
    await test.step("And there are no errors rendered", async () => {
      await assertComponentsHidden([emailPage.errorMessage]);
    });
    await test.step("When I incorrectly fill out the email input field", async () => {
      await emailPage.emailInput.fill("example");
    });
    await test.step("And I press to continue", async () => {
      await emailPage.continueButton.click();
    });
    await test.step("I will see the correct error message rendered", async () => {
      await assertErrorUtil(
        emailPage.errorMessage,
        "Error: Enter an email address in the correct format, like name@example.com"
      );
    });
    await test.step("When I enter the email correctly", async () => {
      await emailPage.emailInput.fill("example@gmail.com");
    });
    await test.step("And I click to open the summary text", async () => {
      await emailPage.summaryTextPreview.click();
    });
    await test.step("And I click to continue", async () => {
      await emailPage.continueButton.click();
    });
    await test.step("I will wait for password policy page to load", async () => {
      await passwordPolicyPage.waitForLoad();
    });
    await test.step("When I see the componenets correctly rendered on the page", async () => {
      await passwordPolicyPage.assertButtonsVisible();
      await passwordPolicyPage.assertTextVisible();
      await passwordPolicyPage.assertFormVisible();
    });
    await test.step("And there are no errors rendered", async () => {
      await assertComponentsHidden([
        passwordPolicyPage.createPasswordError,
        passwordPolicyPage.confirmPasswordError,
      ]);
    });
    await test.step("When I incorrectly fill out the password fields", async () => {
      await passwordPolicyPage.createPasswordInput.fill("TestPassword123!");
      await passwordPolicyPage.confirmPasswordInput.fill("TestWrongPassword");
    });
    await test.step("I will click continue", async () => {
      await passwordPolicyPage.continueButton.click();
    });
    await test.step("When I see the correct error message rendered", async () => {
      await assertErrorUtil(
        passwordPolicyPage.confirmPasswordError,
        "Error: Enter the same password as above"
      );
    });
    await test.step("When I fill the confirm password field correctly", async () => {
      await passwordPolicyPage.confirmPasswordInput.fill("TestPassword123!");
    });
    await test.step("I will click to continue", async () => {
      await passwordPolicyPage.continueButton.click();
    });
    await test.step("When I see the components render correctly", async () => {
      await consentPage.assertButtonsVisible();
      await consentPage.assertTextVisible();
      await consentPage.assertFormVisible();
    });
    await test.step("And there are no error messages rendered", async () => {
      await assertComponentsHidden([consentPage.checkboxErrorMessage]);
    });
    await test.step("When I click the checkbox", async () => {
      await consentPage.confirmCheckbox.click();
      await consentPage.confirmCheckbox.isChecked();
    });
    await test.step("When I click the register button", async () => {
      await consentPage.registerButton.click();
    });
  });
});
