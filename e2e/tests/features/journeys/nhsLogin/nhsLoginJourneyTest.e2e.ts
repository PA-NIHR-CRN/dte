import { test } from "../../../../hooks/CustomFixtures";

test.describe("NHS Login Journey", () => {
  test("Sign in options page renders correctly", async ({
    signInOptionsPage,
    homeAddressPage,
    nhsLogin,
    myAccountPage,
    personalDetailsPage,
  }) => {
    await test.step("Given I have navigated to the Sign in options page", async () => {
      await signInOptionsPage.goto();
    });
    await test.step("Then I will see the Sign in options page", async () => {
      await signInOptionsPage.signInOptionsRendered();
    });
    await test.step("Then I will use Nhs Login to Sign in", async () => {
      await signInOptionsPage.clickContinueToNHSLogin();
      const email = process.env.NHS_LOGIN_EMAIL;
      const password = process.env.NHS_LOGIN_PASSWORD;
      const code = process.env.NHS_LOGIN_CODE;

      if (!email || !password || !code) {
        throw new Error(
          "NHS_LOGIN_EMAIL, NHS_LOGIN_PASSWORD, and NHS_LOGIN_CODE must be defined in the environment variables."
        );
      }

      await nhsLogin.login(email, password, code);
    });
    await test.step("Then I will see the My Account page", async () => {
      await myAccountPage.assertPageElementsVisible();
    });
    await test.step("Then I will see the Personal Details page", async () => {
      await myAccountPage.clickLink("personalDetails");
      await personalDetailsPage.assertPageElementsVisible();
    });
  });
});
