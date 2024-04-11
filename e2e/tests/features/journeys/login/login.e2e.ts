import { test } from '../../../../hooks/CustomFixtures'
import { chromium } from '@playwright/test'
import LoginOptionsPage from '../../../../pages/LoginPages/LoginOptionsPage'

test.describe('login options test', () => {
    test('Successful journey', async ({ loginOptionsPage, loginPage, enterMobilePage, verifyMobilePage, myAccountPage, closeAccountPage }) => {
        await test.step('Once I have navigated to the login options page', async () => {
            await loginOptionsPage.assertPage()
        })

        await test.step('I will see the components are rendered correctly', async () => {
            await loginOptionsPage.assertButtonsVisible()
        })

        await test.step('I will then click the sign in button', async () => {
            await loginOptionsPage.signInButton.click()
        })

        await test.step('I will then see the login page correctly rendered', async () => {
            await loginPage.assertFormVisible()
        })

        await test.step('And then fill in the form correctly', async () => {
            await loginPage.emailInput.fill('e2e.test@nihr.ac.uk')
            await loginPage.passwordInput.fill('P@ssword123*')
        })

        await test.step('Then click the login button', async () => {
            await loginPage.loginButton.click()
        })

        await test.step('And see the verify mobile page correctly rendered', async () => {
            await verifyMobilePage.assertButtonsVisible()
            await verifyMobilePage.assertFormVisible()
            await verifyMobilePage.assertTextVisible()
        })

        await test.step('I will verify my mobile number', async () => {
            await verifyMobilePage.mobileInput.fill('123456')
        })

        await test.step('I will click the continue button', async () => {
            await verifyMobilePage.continueButton.click()
        })
        await test.step('Given I can see my account page correctly rendered', async () => {
            await myAccountPage.assertPageElementsVisible()
            await myAccountPage.assertAllLinksVisible()
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
