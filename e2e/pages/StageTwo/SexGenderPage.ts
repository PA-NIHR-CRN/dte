import { Locator, Page } from '@playwright/test'
import { assertComponentsVisible } from '../../utils/visibilityUtils'

export default class SexGenderPage {
    readonly page: Page
    // --- text --- //
    readonly progressDisplay: Locator
    readonly sexGenderPageHeading: Locator
    readonly sexFormHeading: Locator
    readonly sexGenderHintText: Locator
    readonly genderFormHeading: Locator
    readonly summaryTextPreview: Locator
    readonly summaryText1: Locator
    readonly summaryText2: Locator
    // --- forms --- //
    readonly sexRadioFemaleInput: Locator
    readonly sexRadioMaleInput: Locator

    readonly genderRadioYesInput: Locator
    readonly genderRadioNoInput: Locator
    readonly genderRadioPreferNotInput: Locator
    // --- buttons --- //
    readonly backButton: Locator
    readonly continueButton: Locator
    // --- errors --- //
    readonly sexError: Locator
    readonly genderError: Locator

    constructor(page: Page) {
        this.page = page
        // --- text --- //
        this.progressDisplay = page.getByText('54% complete')
        this.sexGenderPageHeading = page.getByRole('heading', {
            name: 'Sex and gender identity',
        })
        this.sexFormHeading = page.getByRole('heading', {
            name: 'What is your sex?',
        })
        this.sexGenderHintText = page.locator(`p:text("This question is about your sex registered at birth.")`)
        this.genderFormHeading = page.getByRole('heading', {
            name: 'Is the gender you identify with the same as your sex registered at birth?',
        })
        this.summaryTextPreview = page.locator(`span:text("Why we are asking this question")`)
        this.summaryText1 = page.locator(`span:text("Some studies can only include people of a specific sex, or may be focused on people whose gender differs from their assigned sex at birth. We may use this information when contacting you about studies you may be interested in.")`)
        this.summaryText2 = page.locator(
            `span:text("We're also asking this so we can make sure there is a mix of different people taking part in research. We want to make sure everyone 18 and over in the UK feels able to take part in research if they wish to and look to improve our service where our data shows this may not be the case.")`
        )
        // --- forms --- //
        this.sexRadioFemaleInput = page.locator('input#sexRadio-1')
        this.sexRadioMaleInput = page.locator('input#sexRadio-2')

        this.genderRadioYesInput = page.locator('input#genderRadio-1')
        this.genderRadioNoInput = page.locator('input#genderRadio-2')
        this.genderRadioPreferNotInput = page.locator('input#genderRadio-3')

        // --- buttons --- //
        this.backButton = page.getByTitle('Return to previous page')
        this.continueButton = page.getByRole('button', { name: 'Continue' })

        // --- errors --- //
        this.sexError = page.locator('span#sexRadio--error-message')
        this.genderError = page.locator('span#genderRadio--error-message')
    }

    // -- on load methods
    async assertButtonsVisible() {
        await assertComponentsVisible([this.backButton, this.continueButton])
    }

    async assertFormVisible() {
        await assertComponentsVisible([this.sexRadioFemaleInput, this.sexRadioMaleInput, this.genderRadioYesInput, this.genderRadioNoInput, this.genderRadioPreferNotInput])
    }

    async assertTextVisible() {
        await assertComponentsVisible([this.progressDisplay, this.sexGenderPageHeading, this.sexFormHeading, this.sexGenderHintText, this.genderFormHeading, this.summaryTextPreview])
    }
}
