import { test } from "../../../../hooks/CustomFixtures";
import {
  assertComponentsHidden,
  assertErrorUtil,
} from "../../../../utils/visibilityUtils";

test.describe("Successful user journey (UP TO OTP PAGE)", () => {
  test("Successful user journey", async ({
    emailVerifiedPage,
    enterMobilePage,
    verifyMobilePage,
    addressPage,
    phoneNumberOptionalPage,
    sexGenderPage,
    ethinicityPage,
    ethnicBackgroundPage,
    healthConditionsPage,
    areasOfResearchPage,
    completeRegistrationPage,
  }) => {
    await test.step("Given that I have navigated to the email verified page", async () => {
      await emailVerifiedPage.goTo();
    });
    await test.step("When I see the components correctly rendered", async () => {
      await emailVerifiedPage.assertButtonsVisible();
      await emailVerifiedPage.assertLinksVisible();
      await emailVerifiedPage.assertTextVisible();
      await emailVerifiedPage.assertFormVisible();
    });
    test.step("And no error messages are visible", async () => {
      await assertComponentsHidden([
        emailVerifiedPage.emailError,
        emailVerifiedPage.passwordError,
      ]);
    });
    await test.step("I will fill the input fields", async () => {
      await emailVerifiedPage.emailInput.fill("smols108.ts@gmail.com");
      await emailVerifiedPage.passwordInput.fill("TestPassword123!");
    });
    await test.step("Then click to sign in", async () => {
      await emailVerifiedPage.signInButton.click();
      await emailVerifiedPage.signIn();
    });
    // add the enter mobile page steps when random email can be used to sign in
    await test.step("I will then see the enter mobile page components correctly rendered", async () => {
      // await enterMobilePage.assertButtonsVisible();
      // await enterMobilePage.assertFormVisible();
      // await enterMobilePage.assertTextVisible();
    });
    // await test.step("I will fill in the enter mobile input", async () => {
    //   await enterMobilePage.mobileInput.fill("07966302250");
    // });
    // await test.step("Then press continue", async () => {
    //   await enterMobilePage.continueButton.click();
    // });
    await test.step("I will see the verify mobile page components correctly rendered", async () => {
      await verifyMobilePage.assertButtonsVisible();
      await verifyMobilePage.assertFormVisible();
      await verifyMobilePage.assertTextVisible();
    });
    await test.step("I will then see the verify mobile page components correctly rendered", async () => {
      //   // await verifyMobilePage.assertButtonsVisible();
      //   // await verifyMobilePage
    });
    await test.step("I will then click the continue button on the verify mobile page", async () => {
      //   await verifyMobilePage.continueButton.click();
    });
    await test.step("I will then the address page components correctly rendered", async () => {
      //   await addressPage.assertButtonsVisible();
      //   await addressPage.assertFormVisible();
      //   await addressPage.assertTextVisible();
    });
  });
});

test.describe.skip(
  "Successful user journey (AFTER VERIFY MOBILE PAGE)",
  async () => {
    test("Successful user journey", async ({
      emailVerifiedPage,
      enterMobilePage,
      verifyMobilePage,
      addressPage,
      phoneNumberOptionalPage,
      sexGenderPage,
      ethinicityPage,
      ethnicBackgroundPage,
      healthConditionsPage,
      areasOfResearchPage,
      completeRegistrationPage,
      thankYouPage,
    }) => {
      await test.step("I will then navigate to the address page", async () => {
        await addressPage.goTo();
      });
      await test.step("I will then see the components rendered correctly", async () => {
        await addressPage.assertButtonsVisible();
        await addressPage.assertFormVisible();
        await addressPage.assertTextVisible();
      });
      await test.step("I will then click the manual entry button", async () => {
        await addressPage.manualEntryButton.click();
      });
      await test.step("I will then fill the required fields", async () => {
        await addressPage.addressLine1InputManualEntry.fill("57 Rafford Way");
        await addressPage.townInputManualEntry.fill("Bromley");
        await addressPage.postcodeInput.fill("BR1 3EN");
      });
      await test.step("I will then click continue", async () => {
        await addressPage.continueButton.click();
      });
      await test.step("I will then see the components correctly rendered on the optional phone number input page", async () => {
        await phoneNumberOptionalPage.assertButtonsVisible();
        await phoneNumberOptionalPage.assertFormVisible();
        await phoneNumberOptionalPage.assertTextVisible();
      });
      await test.step("I will then fill in the mobile number field", async () => {
        await phoneNumberOptionalPage.mobileInput.fill("07966302250");
      });
      await test.step("I will then click continue", async () => {
        await phoneNumberOptionalPage.continueButton.click();
      });
      await test.step("I will then see the components correctly rendered on the sex gender page", async () => {
        await sexGenderPage.assertButtonsVisible();
        await sexGenderPage.assertFormVisible();
        await sexGenderPage.assertTextVisible();
      });
      await test.step("I will then select my gender and sex", async () => {
        await sexGenderPage.sexRadioMaleInput.check();
        await sexGenderPage.sexRadioFemaleInput.check();
      });
      await test.step("I will then click continue", async () => {
        await sexGenderPage.continueButton.click();
      });
      await test.step("I will then see the components correctly rendered on the ethinicity page", async () => {
        await ethinicityPage.assertButtonsVisible();
        await ethinicityPage.assertFormVisible();
        await ethinicityPage.assertTextVisible();
      });
      await test.step("I will then select that my ethinicity is white", async () => {
        await ethinicityPage.whiteInput.check();
      });
      await test.step("I will then click continue", async () => {
        await ethinicityPage.continueButton.click();
      });
      await test.step("I will then see the components correctly rendered on the ethnic background page", async () => {
        await ethnicBackgroundPage.assertButtonsVisible();
        await ethnicBackgroundPage.assertFormVisible();
        await ethnicBackgroundPage.assertTextVisible();
      });
      await test.step("I will then click the first radio button", async () => {
        await ethnicBackgroundPage.inputFirst.click();
      });
      await test.step("Then click the summary text preview to read why the question is asked", async () => {
        await ethnicBackgroundPage.summaryTextPreview.click();
      });
      await test.step("Then click the continue button", async () => {
        await ethnicBackgroundPage.continueButton.click();
      });
      await test.step("I will then see the components correctly rendered on the health conditions page", async () => {
        await healthConditionsPage.assertButtonsVisible();
        await healthConditionsPage.assertFormVisible();
        await healthConditionsPage.assertTextVisible();
      });
      await test.step("Given that the error message is also not visible", async () => {
        await healthConditionsPage.assertErrorHidden();
      });
      await test.step("I will click the no radio button", async () => {
        await healthConditionsPage.radioButtonNo.click();
      });
      await test.step("Then click the continue button", async () => {
        await healthConditionsPage.continueButton.click();
      });
      await test.step("Given that the components on the areas of research page are correctly rendered", async () => {
        await areasOfResearchPage.assertButtonsVisible();
        await areasOfResearchPage.assertFormVisible();
        await areasOfResearchPage.assertTextVisible();
        await areasOfResearchPage.assertLinkVisible();
      });
      await test.step("I will click the summary text to find out why this question is asked", async () => {
        await areasOfResearchPage.summaryTextPreview.click();
      });
      await test.step("Then I will click continue", async () => {
        await areasOfResearchPage.continueButton.click();
      });
      await test.step("I will then see the complete registration components correctly rendered", async () => {
        await completeRegistrationPage.assertButtonsVisible();
        await completeRegistrationPage.assertTextVisible();
        await completeRegistrationPage.assertDetailsGridVisible();
      });
      await test.step("And then click to complete my registration", async () => {
        await completeRegistrationPage.completeRegistrationButton.click();
      });
      await test.step("Given that the components on the areas of research page are correctly rendered", async () => {
        await thankYouPage.assertButtonsVisible();
        await thankYouPage.assertTextVisible();
        await thankYouPage.assertLinksVisible();
      });
      await test.step("I will then click the go to my account button", async () => {
        await thankYouPage.goToMyAccountButton.click();
      });
    });
  }
);
