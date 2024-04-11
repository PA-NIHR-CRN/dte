import { Locator, Page } from '@playwright/test'
import { assertComponentsVisible, assertErrorUtil, assertComponentsHidden } from '../../utils/visibilityUtils'

export default class AreasOfResearchPage {
    readonly page: Page

    // --- text --- //
    readonly progressDisplay: Locator
    readonly areasOfResearchPageHeading: Locator
    // --- link --- //
    readonly healthyVolunteersLink: Locator
    // --- form --- //
    readonly areasOfResearchInput: Locator
    readonly areasOfResearchLabel: Locator
    readonly clearInputButton: Locator
    // --- buttons --- //
    readonly continueButton: Locator
    readonly backButton: Locator

    constructor(page: Page) {
        this.page = page

        // --- text --- //
        this.progressDisplay = page.getByText('92% complete')
        this.areasOfResearchPageHeading = page.getByRole('heading', {
            name: 'Which areas of research are you interested in?',
        })
        // --- link --- //
        this.healthyVolunteersLink = page.locator(`span:text("healthy volunteers")`)
        // --- form --- //
        this.areasOfResearchInput = page.locator('input#healthConditions')
        this.areasOfResearchLabel = page.locator('label#healthConditions--label')
        this.clearInputButton = page.locator(`button[aria-label="Clear your search"]`)
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.backButton = page.getByTitle('Return to previous page')
    }

    // -- on load methods
    async assertButtonsVisible() {
        await assertComponentsVisible([this.continueButton, this.backButton])
    }

    async assertFormVisible() {
        await assertComponentsVisible([this.areasOfResearchInput, this.areasOfResearchLabel, this.clearInputButton])
    }

    async assertTextVisible() {
        await assertComponentsVisible([this.progressDisplay, this.areasOfResearchPageHeading])
    }

    async assertLinkVisible() {
        await assertComponentsVisible([this.healthyVolunteersLink])
    }
}
