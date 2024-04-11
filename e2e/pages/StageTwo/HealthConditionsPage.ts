import { Locator, Page } from '@playwright/test'
import { assertComponentsVisible, assertComponentsHidden } from '../../utils/visibilityUtils'

export default class HealthConditionsPage {
    readonly page: Page

    // --- text --- //
    readonly progressDisplay: Locator
    readonly healthConditionsPageHeading: Locator
    readonly healthConditionHintText: Locator
    readonly summaryTextPreview: Locator
    readonly summaryText1: Locator
    readonly summaryText2: Locator

    // --- form --- //
    readonly radioButtonYes: Locator
    readonly labelYes: Locator
    readonly radioButtonNo: Locator
    readonly labelNo: Locator
    readonly radioButtonPreferNotToSay: Locator
    readonly labelPreferNotToSay: Locator

    // --- buttons --- //
    readonly backButton: Locator
    readonly continueButton: Locator

    // --- error --- //
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        // --- text --- //
        this.progressDisplay = page.getByText('77% complete')
        this.healthConditionsPageHeading = page.getByRole('heading', {
            name: 'Do you have any health conditions that have lasted, or are expected to last, for 12 months or more?',
        })
        this.healthConditionHintText = page.locator(`p:text("This includes any physical and mental health conditions or illnesses.")`)
        this.summaryTextPreview = page.locator(`span:text("Why we are asking this question")`)
        this.summaryText1 = page.locator(
            `span:text('Some studies will require volunteers with disabilities, other studies want to make sure they have a representative sample of the population taking part in research studies. We may use this information when contacting you about studies you may be interested in.")`
        )
        this.summaryText2 = page.locator(`span:text("If we find that people with disabilities are under represented in signing up to be contacted about research we will look at how to improve this.")`)

        // --- form --- //
        this.radioButtonYes = page.locator('input#disabilityRadio-1')
        this.labelYes = page.locator('label#disabilityRadio-1--label')
        this.radioButtonNo = page.locator('input#disabilityRadio-2')
        this.labelNo = page.locator('label#disabilityRadio-2--label')
        this.radioButtonPreferNotToSay = page.locator('input#disabilityRadio-3')
        this.labelPreferNotToSay = page.locator('label#disabilityRadio-3--label')

        // --- buttons --- //
        this.backButton = page.getByTitle('Return to previous page')
        this.continueButton = page.getByRole('button', { name: 'Continue' })

        // --- error --- //
        this.errorMessage = page.locator('span#disabilityRadio--error-message')
    }

    // -- on load methods
    async assertButtonsVisible() {
        await assertComponentsVisible([this.backButton, this.continueButton])
    }

    async assertFormVisible() {
        await assertComponentsVisible([this.radioButtonYes, this.labelYes, this.radioButtonNo, this.labelNo, this.radioButtonPreferNotToSay, this.labelPreferNotToSay])
    }

    async assertTextVisible() {
        await assertComponentsVisible([this.progressDisplay, this.healthConditionsPageHeading, this.healthConditionHintText, this.summaryTextPreview])
    }

    async assertErrorHidden() {
        await assertComponentsHidden([this.errorMessage])
    }
}
