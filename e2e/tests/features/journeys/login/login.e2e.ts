import { test } from "../../../../hooks/CustomFixtures";

test.describe("Successful user journey", async () => {
  test("Successful user journey", async ({
    loginPage,
    myAccountPage,
    accountSettingsPage,
    areasOfResearchAccountPage,
    changeAddressPage,
    changeDateOfBirthPage,
    changeEmailPage,
    changeOptionalPhoneNumberPage,
    changePasswordPage,
    changeSexGenderPage,
  }) => {
    test.step("Given I am on the login page", async () => {
      await loginPage.assertPage();
    });
    test.step("I will fill in the inputs to sign in", async () => {
      await loginPage.emailInput.fill("example@gmail.com");
      await loginPage.passwordInput.fill("TestPassword123!");
    });
    test.step("Then click to sign in", async () => {
      await loginPage.loginButton.click();
    });
    test.step("Given I can see my account page correctly rendered", async () => {
      await myAccountPage.assertPageElementsVisible();
      await myAccountPage.assertAllLinksVisible();
      await myAccountPage.assertMainContentText();
    });
    test.step("I will then click the account the account settings link", async () => {
      await myAccountPage.clickLink("Account settings");
    });
    test.step("I will then see the account settings page correctly rendered", async () => {
      await accountSettingsPage.assertButtonsVisible();
      await accountSettingsPage.assertTextVisible();
    });
    test.step("Then click to change my email address", async () => {
      await accountSettingsPage.changeEmailButton.click();
    });
    test.step("I will then see the change email page components rendered", async () => {
      await changeEmailPage.assertButtonsVisible();
      await changeEmailPage.assertFormVisible();
      await changeEmailPage.assertTextVisible();
    });
    test.step("and fill the email inputs with a new email", async () => {
      await changeEmailPage.newEmailInput.fill("newEmail@gmail.com");
      await changeEmailPage.confirmEmailInput.fill("newEmail@gmail.com");
    });
    test.step("I will then click cancel", async () => {
      await changeEmailPage.cancelButton.click();
    });
    test.step("I will then see the account settings page rendered again", async () => {
      await accountSettingsPage.assertButtonsVisible();
      await accountSettingsPage.assertTextVisible();
    });
    test.step("I will then click back to return to the my account page", async () => {
      await accountSettingsPage.backButton.click();
    });
    test.step("I will then see the my account page rendered again", async () => {
      await myAccountPage.assertPageElementsVisible();
      await myAccountPage.assertAllLinksVisible();
      await myAccountPage.assertMainContentText();
    });
    test.step("I will then click to go to the areas of research page", async () => {
      await myAccountPage.clickLink("Areas of research");
    });
    test.step("Given I have seen the components rendered correctly", async () => {
      areasOfResearchAccountPage.assertButtonsVisible();
      areasOfResearchAccountPage.assertFormVisible();
      areasOfResearchAccountPage.assertLinksVisible();
      areasOfResearchAccountPage.assertTextVisible();
    });
    await test.step("I will add an area of research I'm interested in", async () => {
      areasOfResearchAccountPage.formInput.fill("Cancer");
    });
    await test.step("And then select bone cancer from the dropdown list", async () => {
      areasOfResearchAccountPage.boneCancerSelect.click();
    });
    await test.step("Then click the save button to save my change", async () => {
      areasOfResearchAccountPage.saveButton.click();
    });
  });
});
