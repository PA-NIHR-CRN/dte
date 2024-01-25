import { test } from "../../../../hooks/CustomFixtures";

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
    await test.step("Then I will see the components correctly rendered", async () => {
      await namePage.assertTextVisible();
      await namePage.assertButtonsVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
      await namePage.assertErrorsHidden();
    });
    await test.step("Then I will fill in the first and last name inputs", async () => {
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("lastName");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
    await test.step("Then the errors will be hidden if I go back to the name page", async () => {
      await namePage.assertErrorsHidden();
    });
    await test.step("Then I will successfully navigate to the DoB page", async () => {
      await dateOfBirthPage.waitForPageLoad();
    });
    await test.step("Then I will see the DoB page components correctly rendered", async () => {
      await dateOfBirthPage.assertButtonsVisible();
      await dateOfBirthPage.assertTextVisible();
      await dateOfBirthPage.assertFormVisible();
      await dateOfBirthPage.assertErrorsHidden();
    });
    await test.step("I will then fill in the form fields correctly", async () => {
      await dateOfBirthPage.fillDayField("12");
      await dateOfBirthPage.fillMonthField("7");
      await dateOfBirthPage.fillYearField("1998");
    });
    await test.step("I will then click to open the summary text and see it correctly rendered", async () => {
      await dateOfBirthPage.toggleSummaryText();
    });
    await test.step("I will then click continue to move to the email page", async () => {
      await dateOfBirthPage.clickContinue();
    });
    await test.step("Then any error messages should be hidden if I return to the DoB page", async () => {
      await dateOfBirthPage.assertErrorsHidden();
    });
    await test.step("Then I will successfully navigate to the email page", async () => {
      await emailPage.waitForPageLoad();
    });
    await test.step("Then I will see the email page components correctly rendered", async () => {
      await emailPage.assertButtonsVisible();
      await emailPage.assertTextVisible();
      await emailPage.assertFormVisible();
      await emailPage.assertErrorsHidden();
    });
    await test.step("Then I will correctly fill out the email input field", async () => {
      await emailPage.assertFillEmailField("example@gmail.com");
    });
    await test.step("Then I will click to open the summary text and see it correctly rendered", async () => {
      await emailPage.toggleSummaryText();
    });
    await test.step("Then I will click the continue button to move to the next page", async () => {
      await emailPage.clickContinue();
    });
    await test.step("Then I will see the password policy page load", async () => {
      await passwordPolicyPage.waitForPageLoad();
    });
    await test.step("Then I will see the componenets correctly rendered on the page", async () => {
      await passwordPolicyPage.assertButtonsVisible();
      await passwordPolicyPage.assertTextVisible();
      await passwordPolicyPage.assertFormVisible();
      await passwordPolicyPage.assertErrorsHidden();
    });
    await test.step("Then I will correctly fill out the password fields", async () => {
      await passwordPolicyPage.assertFillCreatePasswordField(
        "TestPassword123!"
      );
      await passwordPolicyPage.assertFillConfirmPasswordField(
        "TestPassword123!"
      );
    });
    await test.step("I will then click the continue button to move to the next page", async () => {
      await passwordPolicyPage.clickContinue();
    });
    await test.step("I will then see the consent page load", async () => {
      await consentPage.waitForPageLoad();
    });
    await test.step("I will then see the components render correctly", async () => {
      await consentPage.assertButtonsVisible();
      await consentPage.assertTextVisible();
      await consentPage.assertFormVisible();
      await consentPage.assertErrorsHidden();
    });
    await test.step("Then I will click the checkbox", async () => {
      await consentPage.assertClickCheckbox();
    });
    await test.step("I will then click the register button", async () => {
      await consentPage.clickRegister();
    });
  });
});

// Unsuccessful Name Page Journeys
test.describe("Unsuccessful user name page journeys", () => {
  test("Empty last name field journey", async ({ namePage }) => {
    await test.step("Given I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("Then I will see the components correctly rendered", async () => {
      await namePage.assertButtonsVisible();
      await namePage.assertTextVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
      await namePage.assertErrorsHidden();
    });
    await test.step("Then I will fill in the first name field and leave the last name field blank", async () => {
      await namePage.fillFirstName("firstName");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see an error message for the last name being empty", async () => {
      await namePage.assertLastNameError();
    });
    await test.step("I will then go back to fill in the last name field aswell", async () => {
      await namePage.fillLastName("lastName");
    });
    await test.step("I will then click continue again", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see that the error messages are gone if I navigate back to name page", async () => {
      await namePage.assertErrorsHidden();
    });
    await test.step("I will then go back to check that the errors are hidden", async () => {
      await namePage.clickBack();
    });
  });

  test("Empty first name field journey", async ({ namePage }) => {
    await test.step("Given I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("Then I will see the components correctly rendered", async () => {
      await namePage.assertTextVisible();
      await namePage.assertButtonsVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
      await namePage.assertErrorsHidden();
    });
    await test.step("Then I will fill in the last name field and leave the first name field blank", async () => {
      await namePage.fillLastName("lastName");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see an error message for the first name being empty", async () => {
      await namePage.assetFirstNameError();
    });
    await test.step("I will then go back to fill in the first name field aswell", async () => {
      await namePage.fillFirstName("firstName");
    });
    await test.step("I will then click continue again", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see that the error messages are gone if I navigate back to name page", async () => {
      await namePage.assertErrorsHidden();
    });
    await test.step("I will then go back to check that the errors are hidden", async () => {
      await namePage.clickBack();
    });
  });

  test("Both fields empty journey", async ({ namePage }) => {
    await test.step("Given I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("Then I will see the components correctly rendered", async () => {
      await namePage.assertButtonsVisible();
      await namePage.assertTextVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
      await namePage.assertErrorsHidden();
    });
    await test.step("Then I will press the continue button without filling the input fields", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see an error message for both fields being empty", async () => {
      await namePage.assertBothErrorMessages();
    });
    await test.step("I will then go back to fill in both fields", async () => {
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("lastName");
    });
    await test.step("I will then click continue again", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see that the error messages are gone if I navigate back to name page", async () => {
      await namePage.assertErrorsHidden();
    });
    await test.step("I will then go back to check that the errors are hidden", async () => {
      await namePage.clickBack();
    });
  });
});

// Unsuccessful DoB page Journeys
test.describe("Unsuccessful DoB page journeys", () => {
  test("Empty day and month fields", async ({ namePage, dateOfBirthPage }) => {
    await test.step("I will correctly navigate through the name page", async () => {
      await namePage.goTo();
      await namePage.assertTextVisible();
      await namePage.assertButtonsVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
      await namePage.assertErrorsHidden();
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("lastName");
      await namePage.clickContinue();
    });
    await test.step("I will then wait for the DoB page to load and render components", async () => {
      await dateOfBirthPage.waitForPageLoad();
    });
    await test.step("I will then see the components rendered correctly", async () => {
      await dateOfBirthPage.assertButtonsVisible();
      await dateOfBirthPage.assertErrorsHidden();
      await dateOfBirthPage.assertFormVisible();
      await dateOfBirthPage.assertTextVisible();
    });
    await test.step("I will then fill the year field correctly, but leave day and month fields empty", async () => {
      await dateOfBirthPage.fillYearField("1985");
    });
    await test.step("I will click the continue button", async () => {
      await dateOfBirthPage.clickContinue();
    });
    await test.step("I will the the empty day and month error", async () => {
      await dateOfBirthPage.assertError(
        "Error: Enter a date of birth day and month"
      );
    });
    await test.step("I will then fill in the day correctly and the month incorrectly", async () => {
      await dateOfBirthPage.fillDayField("15");
      await dateOfBirthPage.fillMonthField("15");
    });
    await test.step("I will click continue again", async () => {
      await dateOfBirthPage.clickContinue();
    });
    await test.step("I will then see an invalid month error", async () => {
      await dateOfBirthPage.assertError(
        "Error: Month must be number between 1 and 12"
      );
      await test.step("I will then fill out the month field correctly", async () => {
        await dateOfBirthPage.fillMonthField("7");
      });
      await test.step("I will then press continue to move to the next page", async () => {
        await dateOfBirthPage.clickContinue();
      });
      await test.step("I will then not see error messages if I go back to the DoB page", async () => {
        await dateOfBirthPage.assertErrorsHidden();
      });
    });
  });
});
