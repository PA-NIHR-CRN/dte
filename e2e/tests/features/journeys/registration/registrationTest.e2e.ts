import { test } from '../../../../hooks/CustomFixtures'
import { assertErrorUtil, assertComponentsHidden } from '../../../../utils/visibilityUtils'

test.describe('Successful user registration journey', () => {
    test('Successful registration journey', async ({
        startRegistrationPage,
        namePage,
        dateOfBirthPage,
        emailPage,
        passwordPolicyPage,
        consentPage,
        emailVerificationPage,
        emailVerifiedPage,
        loginPage,
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
        myAccountPage,
        closeAccountPage,
    }) => {
        await test.step('Given I have navigated to the start registration page', async () => {
            await startRegistrationPage.goTo()
        })
        await test.step('I will see the components correctly rendered', async () => {
            await startRegistrationPage.assertButtonsVisible()
            await startRegistrationPage.assertTextVisible()
        })
        await test.step('Then click to start registration', async () => {
            await startRegistrationPage.registerWithEmailButton.click()
        })
        await test.step('When I see the components correctly rendered', async () => {
            await namePage.assertTextVisible()
            await namePage.assertButtonsVisible()
            await namePage.assertFormVisible()
            await namePage.assertCorrectContent()
        })
        await test.step('Then I will not see any error messages rendered', async () => {
            await assertComponentsHidden([namePage.firstNameError, namePage.lastNameError])
        })
        await test.step('When I fill only the first name input', async () => {
            await namePage.firstNameInput.fill('firstName')
        })
        await test.step('When I press continue', async () => {
            await namePage.continueButton.click()
        })
        await test.step('I will see an error message correctly rendered', async () => {
            await assertErrorUtil(namePage.lastNameError, 'Error: Enter your last name')
        })
        await test.step('When I fill in the first and last name inputs', async () => {
            await namePage.lastNameInput.fill('lastName')
        })
        await test.step('Then I will press the continue button to move to the next page', async () => {
            await namePage.continueButton.click()
        })
        await test.step('When I see the DoB page components correctly rendered', async () => {
            await dateOfBirthPage.assertButtonsVisible()
            await dateOfBirthPage.assertTextVisible()
            await dateOfBirthPage.assertFormVisible()
        })
        await test.step('And there are no errors rendered', async () => {
            await assertComponentsHidden([dateOfBirthPage.errorMessage])
        })
        await test.step('When I fill in the form fields with an invalid month', async () => {
            await dateOfBirthPage.dayInput.fill('15')
            await dateOfBirthPage.monthInput.fill('22')
            await dateOfBirthPage.yearInput.fill('1985')
        })
        await test.step('I will press continue', async () => {
            await dateOfBirthPage.continueButton.click()
        })
        await test.step('I will then see the correct error message rendered', async () => {
            await assertErrorUtil(dateOfBirthPage.errorMessage, 'Error: Month must be number between 1 and 12')
        })
        await test.step('When I fill out all inputs correctly', async () => {
            await dateOfBirthPage.monthInput.fill('12')
        })
        await test.step("When I click to open the summary text I'll see it correctly rendered", async () => {
            await dateOfBirthPage.summaryTextPreview.click()
        })
        await test.step('Then I will click continue', async () => {
            await dateOfBirthPage.continueButton.click()
        })
        await test.step('When I see the email page components correctly rendered', async () => {
            await emailPage.assertButtonsVisible()
            await emailPage.assertTextVisible()
            await emailPage.assertFormVisible()
        })
        await test.step('And there are no errors rendered', async () => {
            await assertComponentsHidden([emailPage.errorMessage])
        })
        await test.step('When I incorrectly fill out the email input field', async () => {
            await emailPage.emailInput.fill('example')
        })
        await test.step('And I press to continue', async () => {
            await emailPage.continueButton.click()
        })
        await test.step('I will see the correct error message rendered', async () => {
            await assertErrorUtil(emailPage.errorMessage, 'Error: Enter an email address in the correct format, like name@example.com')
        })
        const emailTest = `e2e.test@nihr.ac.uk`
        await test.step('When I enter the email correctly', async () => {
            await emailPage.emailInput.fill(emailTest)
        })
        await test.step('And I click to open the summary text', async () => {
            await emailPage.summaryTextPreview.click()
        })
        await test.step('And I click to continue', async () => {
            await emailPage.continueButton.click()
        })
        await test.step('I will wait for password policy page to load', async () => {
            await passwordPolicyPage.waitForLoad()
        })
        await test.step('When I see the componenets correctly rendered on the page', async () => {
            await passwordPolicyPage.assertButtonsVisible()
            await passwordPolicyPage.assertTextVisible()
            await passwordPolicyPage.assertFormVisible()
        })
        await test.step('And there are no errors rendered', async () => {
            await assertComponentsHidden([passwordPolicyPage.createPasswordError, passwordPolicyPage.confirmPasswordError])
        })
        await test.step('When I incorrectly fill out the password fields', async () => {
            await passwordPolicyPage.createPasswordInput.fill('P@ssword123*')
            await passwordPolicyPage.confirmPasswordInput.fill('TestWrongPassword')
        })
        await test.step('I will click continue', async () => {
            await passwordPolicyPage.continueButton.click()
        })
        await test.step('When I see the correct error message rendered', async () => {
            await assertErrorUtil(passwordPolicyPage.confirmPasswordError, 'Error: Enter the same password as above')
        })
        await test.step('When I fill the confirm password field correctly', async () => {
            await passwordPolicyPage.confirmPasswordInput.fill('P@ssword123*')
        })
        await test.step('I will click to continue', async () => {
            await passwordPolicyPage.continueButton.click()
        })
        await test.step('When I see the components render correctly', async () => {
            await consentPage.assertButtonsVisible()
            await consentPage.assertTextVisible()
            await consentPage.assertFormVisible()
        })
        await test.step('And there are no error messages rendered', async () => {
            await assertComponentsHidden([consentPage.checkboxErrorMessage])
        })
        await test.step('When I click the checkbox', async () => {
            await consentPage.confirmCheckbox.click()
            await consentPage.confirmCheckbox.isChecked()
        })
        await test.step('When I click the register button', async () => {
            await consentPage.registerButton.click()
        })
        await test.step('Given that I have navigated to the email verified page', async () => {
            await loginPage.assertPage()
        })
        await test.step('I will then see the components correctly rendered', async () => {
            await loginPage.assertFormVisible()
        })
        await test.step('I will fill the input fields', async () => {
            await loginPage.emailInput.fill(emailTest)
            await loginPage.passwordInput.fill('P@ssword123*')
        })
        await test.step('Then click to sign in', async () => {
            await loginPage.loginButton.click()
        })
        await test.step('And I will see the enter mobile page rendered', async () => {
            await enterMobilePage.assertButtonsVisible()
            await enterMobilePage.assertTextVisible()
            await enterMobilePage.assertFormVisible()
        })
        await test.step('Then enter my mobile number', async () => {
            await enterMobilePage.enterMobileInput.fill('07432843281')
        })
        await test.step('And click to continue', async () => {
            await enterMobilePage.continueButton.click()
        })
        await test.step('Once I have navigated to the verify mobile page', async () => {
            await verifyMobilePage.assertButtonsVisible()
            await verifyMobilePage.assertFormVisible()
            await verifyMobilePage.assertTextVisible()
        })
        await test.step('I will fill out the verification code input', async () => {
            await verifyMobilePage.mobileInput.fill('123456')
        })
        await test.step('And click to continue', async () => {
            await verifyMobilePage.continueButton.click()
        })
        await test.step('I will then see the address page rendered', async () => {
            await addressPage.assertButtonsVisible()
            await addressPage.assertFormVisible()
            await addressPage.assertTextVisible()
        })
        await test.step('And fill out the postcode input', async () => {
            await addressPage.postcodeInput.fill('SW1E 5DN')
        })
        await test.step('And press to find the address', async () => {
            await addressPage.findAddressButton.click()
        })
        await test.step('Then select the correct address', async () => {
            await addressPage.addressSelectorDropdown.selectOption('P A Consulting Group, 10, Bressenden Place, London, SW1E 5DN')
        })
        await test.step('And click to continue', async () => {
            await addressPage.continueButton.click()
        })
        await test.step('Once I navigate to the optional mobile number page', async () => {
            await phoneNumberOptionalPage.assertButtonsVisible()
            await phoneNumberOptionalPage.assertFormVisible()
            await phoneNumberOptionalPage.assertTextVisible()
        })
        await test.step('I will click to continue without entering an optional phone number', async () => {
            await phoneNumberOptionalPage.continueButton.click()
        })
        await test.step('Once I navigate to the sex and gender page', async () => {
            await sexGenderPage.assertButtonsVisible()
            await sexGenderPage.assertFormVisible()
            await sexGenderPage.assertTextVisible()
        })
        await test.step('Then click that my sex is male', async () => {
            await sexGenderPage.sexRadioMaleInput.check()
        })
        await test.step('And click that my gender is the same as my sex', async () => {
            await sexGenderPage.genderRadioYesInput.check()
        })
        await test.step('And click to continue', async () => {
            await sexGenderPage.continueButton.click()
        })
        await test.step('Once I navigate to the ethinicity page', async () => {
            await ethinicityPage.assertButtonsVisible()
            await ethinicityPage.assertFormVisible()
            await ethinicityPage.assertTextVisible()
        })
        await test.step('I will click the white option', async () => {
            await ethinicityPage.whiteInput.check()
        })
        await test.step('And click to continue', async () => {
            await ethinicityPage.continueButton.click()
        })
        await test.step('Once I navigate to the ethnic background page', async () => {
            await ethnicBackgroundPage.assertButtonsVisible()
            await ethnicBackgroundPage.assertFormVisible()
            await ethnicBackgroundPage.assertTextVisible()
        })
        await test.step('I will select that I am Irish', async () => {
            await ethnicBackgroundPage.inputSecond.check()
        })
        await test.step('And click to continue', async () => {
            await ethnicBackgroundPage.continueButton.click()
        })
        await test.step('Once I have navigated to the health conditions page', async () => {
            await healthConditionsPage.assertButtonsVisible()
            await healthConditionsPage.assertFormVisible()
            await healthConditionsPage.assertTextVisible()
        })
        await test.step('I will select that I do not have any health conditions', async () => {
            await healthConditionsPage.radioButtonNo.check()
        })
        await test.step('And click to continue', async () => {
            await healthConditionsPage.continueButton.click()
        })
        await test.step('Once I have navigated to the areas of research page', async () => {
            await areasOfResearchPage.assertButtonsVisible()
            await areasOfResearchPage.assertFormVisible()
            await areasOfResearchPage.assertLinkVisible()
            await areasOfResearchPage.assertTextVisible()
        })
        await test.step("I will fill the input saying what research areas I'm interested in", async () => {
            await areasOfResearchPage.areasOfResearchInput.fill('Bone cancer')
        })
        await test.step('And click to continue', async () => {
            await areasOfResearchPage.continueButton.click()
        })
        await test.step('Once I have navigated to the complete registration page', async () => {
            await completeRegistrationPage.assertButtonsVisible()
            await completeRegistrationPage.assertDetailsGridVisible()
            await completeRegistrationPage.assertTextVisible()
        })
        await test.step('I will then click to complete the registration', async () => {
            await completeRegistrationPage.completeRegistrationButton.click()
        })
        await test.step('Once I navigate to the thank you for registering page', async () => {
            // await thankYouPage.assertButtonsVisible()
            // await thankYouPage.assertLinksVisible()
            await thankYouPage.assertTextVisible()
        })
        await test.step('I will then click to go to my account', async () => {
            await thankYouPage.goToMyAccountButton.click()
        })
        await test.step('Given that I have navigated to my account', async () => {
            await myAccountPage.assertLinkVisible('closeAccount')
        })
        await test.step('I will click the close my account link', async () => {
            await myAccountPage.clickLink('closeAccount')
        })
        await test.step('Given I have navigated to the close account page', async () => {
            await closeAccountPage.assertButtonsVisible()
            await closeAccountPage.assertTextVisible()
            await closeAccountPage.assertMainContent()
        })
        await test.step('I will click to close my account', async () => {
            await closeAccountPage.closeAccountButton.click()
        })
        await test.step('And confirm the closing of my account', async () => {
            await closeAccountPage.confirmCloseAccountButton.click()
        })
    })
})
