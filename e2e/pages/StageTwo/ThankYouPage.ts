import { Locator, Page } from '@playwright/test'
import { assertComponentsVisible, assertErrorUtil, assertComponentsHidden } from '../../utils/visibilityUtils'

export default class ThankYouPage {
    readonly page: Page
    // text
    readonly pageHeading: Locator
    // links
    readonly moreInfoLink: Locator
    readonly researchOpportunitiesLink: Locator
    // form
    // buttons
    readonly goToMyAccountButton: Locator
    readonly signUpNewsletterButton: Locator

    constructor(page: Page) {
        this.page = page
        // text
        this.pageHeading = page.getByRole('heading', {
            name: 'Thank you for registering for Be Part of Research',
        })
        // links
        this.moreInfoLink = page.locator(`a[href="https://bepartofresearch.nihr.ac.uk/taking-part/How-to-take-part/?utm_source=vs-website&utm_medium=referral&utm_campaign=vs-registration-complete"]`)
        this.researchOpportunitiesLink = page.locator(`a[href="https://bepartofresearch.nihr.ac.uk/?utm_source=vs-website&utm_medium=referral&utm_campaign=vs-registration-complete"]`)
        // buttons
        this.goToMyAccountButton = page.locator(`a[href="/"]`)
        this.signUpNewsletterButton = page.getByRole('button', {
            name: 'Sign up now',
        })
    }

    // -- on load methods
    async assertButtonsVisible() {
        await assertComponentsVisible([this.goToMyAccountButton, this.signUpNewsletterButton])
    }

    async assertTextVisible() {
        await assertComponentsVisible([this.pageHeading])
    }

    async assertLinksVisible() {
        await assertComponentsVisible([this.moreInfoLink, this.researchOpportunitiesLink])
    }
}
