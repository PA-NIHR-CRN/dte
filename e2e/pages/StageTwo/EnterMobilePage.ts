import { Locator, Page } from '@playwright/test'
import { assertComponentsVisible } from '../../utils/visibilityUtils'

export default class EnterMobilePage {
    readonly page: Page
    // text
    readonly pageHeading: Locator
    // form
    readonly enterMobileInput: Locator
    // buttons
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        // text
        this.pageHeading = page.locator(`h1:text("Enter your mobile phone number")`)
        // form
        this.enterMobileInput = page.locator(`input#mobilePhoneNumber`)
        // buttons
        this.continueButton = page.getByRole('button', {
            name: 'Continue',
            exact: true,
        })
    }

    // --- VISIBILITY METHODS --- //
    async assertButtonsVisible() {
        await assertComponentsVisible([this.continueButton])
    }

    async assertTextVisible() {
        await assertComponentsVisible([this.pageHeading])
    }

    async assertFormVisible() {
        await assertComponentsVisible([this.enterMobileInput])
    }
}
