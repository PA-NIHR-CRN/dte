import { Locator, Page, expect } from '@playwright/test'
import { assertComponentsVisible } from '../../utils/visibilityUtils'
export default class StartRegistrationPage {
    // variables
    readonly page: Page
    readonly pageHeading: Locator
    readonly registerWithEmailButton: Locator

    // constructor
    constructor(page: Page) {
        this.page = page
        this.pageHeading = page.locator(`h1:text("Register with Be Part of Research")`)
        this.registerWithEmailButton = page.locator(`a[href="/Participants/Register/Questions"]`)
    }

    async goTo() {
        await this.page.goto('participants/register')
    }

    async assertButtonsVisible() {
        await assertComponentsVisible([this.registerWithEmailButton])
    }

    async assertTextVisible() {
        await assertComponentsVisible([this.pageHeading])
    }
}
