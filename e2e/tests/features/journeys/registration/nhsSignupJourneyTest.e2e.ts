import { test } from "../../../../hooks/CustomFixtures";

// --- NAME PAGE TESTS --- //
test.describe("Successful user name page journey", () => {
  test("Successful name page journey", async ({ namePage }) => {
    await test.step("Given I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("Then I will see the components correctly rendered", async () => {
      await namePage.assertButtonsVisible();
      await namePage.assertTextVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
    });
    await test.step("Then I will fill in the first and last name inputs", async () => {
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("lastName");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will not see error messages", async () => {
      await namePage.checkInputsFilled("firstName", "lastName");
      await namePage.assertErrorsHidden();
    });
  });
});

test.describe("User unsuccessful name page journeys", () => {
  test("Empty first name field journey", async ({ namePage }) => {
    await test.step("Given I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("Then I will see the components correctly rendered", async () => {
      await namePage.assertButtonsVisible();
      await namePage.assertTextVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
    });
    await test.step("Then I will fill in the first name field and leave the last name field blank", async () => {
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see an error message for the last name being empty", async () => {
      await namePage.checkInputsFilled("firstName", "");
    });
    await test.step("I will then go back to fill in the last name field aswell", async () => {
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("lastName");
    });
    await test.step("I will then click continue again", async () => {
      await namePage.clickContinue();
    });
    await test.step("The error messages will then be hidden", async () => {
      await namePage.assertErrorsHidden();
    });
  });

  test("Empty last name field journey", async ({ namePage }) => {
    await test.step("Given I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("Then I will see the components correctly rendered", async () => {
      await namePage.assertButtonsVisible();
      await namePage.assertTextVisible();
      await namePage.assertFormVisible();
      await namePage.assertCorrectContent();
    });
    await test.step("Then I will fill in the last name field and leave the first name field blank", async () => {
      await namePage.fillFirstName("");
      await namePage.fillLastName("lastName");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see an error message for the last name being empty", async () => {
      await namePage.checkInputsFilled("", "lastName");
    });
    await test.step("I will then go back to fill in the last name field aswell", async () => {
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("lastName");
    });
    await test.step("I will then click continue again", async () => {
      await namePage.clickContinue();
    });
    await test.step("The error messages will then be hidden", async () => {
      await namePage.assertErrorsHidden();
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
    });
    await test.step("Then I will leave both fields blank", async () => {
      await namePage.fillFirstName("");
      await namePage.fillLastName("");
    });
    await test.step("Then I will press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
    await test.step("I will then see an error message for both fields being empty", async () => {
      await namePage.checkInputsFilled("", "");
    });
    await test.step("I will then go back to fill in both fields", async () => {
      await namePage.fillFirstName("firstName");
      await namePage.fillLastName("lastName");
    });
    await test.step("I will then click continue again", async () => {
      await namePage.clickContinue();
    });
    await test.step("The error messages will then be hidden", async () => {
      await namePage.assertErrorsHidden();
    });
  });
});

// --- DoB PAGE TESTS --- //
test.describe("Successful user date of birth page journey", () => {
  test("Successful date of birth journey", async ({ dateOfBirthPage }) => {
    await test.step("Given I have continued to the date of birth page", async () => {
      await dateOfBirthPage.goTo();
    });
    await test.step("Then I will see the components correctly rendered", async () => {
      await dateOfBirthPage.assertButtonsVisible();
      await dateOfBirthPage.assertTextVisible();
      await dateOfBirthPage.assertFormVisible();
      await dateOfBirthPage.assertErrorsHidden();
      // add a few functions to ensure that the components contain the correct content
    });
    await test.step("Then I will click on a fill the form fields correctly", async () => {
      await dateOfBirthPage.fillDayField("12");
      await dateOfBirthPage.fillMonthField("7");
      await dateOfBirthPage.fillYearField("1998");
    });
    test.step("Then I will click continue to move to the next page", async () => {
      await dateOfBirthPage.clickContinue();
    });
    test.step("No errors will be shown on the DoB page", async () => {
      await dateOfBirthPage.assertErrorsHidden();
    });
  });
});
