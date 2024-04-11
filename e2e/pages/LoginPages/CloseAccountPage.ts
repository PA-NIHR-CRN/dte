import { expect, Locator, Page } from '@playwright/test'
import { assertComponentsVisible } from '../../utils/visibilityUtils'

export default class CloseAccountPage {
    readonly page: Page
    // text
    readonly pageHeading: Locator
    readonly confirmCloseAccountText: Locator
    // buttons
    readonly backButton: Locator
    readonly closeAccountButton: Locator
    readonly confirmCloseAccountButton: Locator
    readonly cancelCloseAccountButton: Locator
    readonly mainContent: Locator

    constructor(page: Page) {
        this.page = page
        // text
        this.pageHeading = page.getByRole('heading', {
            name: 'Close your account',
            exact: true,
        })
        // buttons
        this.backButton = page.getByRole('link', { name: 'Back', exact: true })
        this.closeAccountButton = page.getByRole('button', {
            name: 'Close your account',
        })
        this.confirmCloseAccountButton = page.getByRole('button', {
            name: 'Confirm',
            exact: true,
        })
        this.cancelCloseAccountButton = page.getByRole('button', {
            name: 'Cancel',
        })
        this.mainContent = page.locator(`div#main`)
    }

    async assertMainContent() {
        await assertComponentsVisible([this.mainContent])
    }
    async assertTextVisible() {
        await assertComponentsVisible([this.pageHeading])
    }

    async assertButtonsVisible() {
        await assertComponentsVisible([this.backButton, this.closeAccountButton])
    }
}
