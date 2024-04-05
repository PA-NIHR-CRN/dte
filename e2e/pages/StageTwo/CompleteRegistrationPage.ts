import { Locator, Page } from '@playwright/test'
import { assertComponentsVisible, assertErrorUtil, assertComponentsHidden } from '../../utils/visibilityUtils'

export default class CompleteRegistrationPage {
    readonly page: Page
    // text
    readonly progressDisplay: Locator
    readonly completeRegistrationPageHeading: Locator
    readonly completeRegistrationHintText: Locator
    // link
    // form
    readonly detailsGrid: Locator
    // buttons
    readonly completeRegistrationButton: Locator
    readonly changeHomeAddressButton: Locator
    readonly changePhoneNumberButton: Locator
    readonly changeSexButton: Locator
    readonly changeGenderButton: Locator
    readonly changeEthinictyButton: Locator
    readonly changeEthnicGroupButton: Locator
    readonly changeHealthConditionsButton: Locator
    readonly changeAreasOfResearchButton: Locator

    constructor(page: Page) {
        this.page = page
        // text
        this.progressDisplay = page.getByText('100% complete')
        this.completeRegistrationPageHeading = page.getByRole('heading', {
            name: 'Check your answers before completing your registration',
        })
        this.completeRegistrationHintText = page.locator(`span:text("If you need to change any of your answers later, you can do this in your Be Part of Research account.")`)
        // form
        this.detailsGrid = page.locator('dl.govuk-summary-list')
        // buttons
        this.completeRegistrationButton = page.getByRole('button', { name: 'Complete registration', exact: true })
        this.changeHomeAddressButton = page.locator(`span:has-text("Change") > span:has-text("home address")`)
        this.changePhoneNumberButton = page.locator(`span:has-text("Change") > span:has-text("phone number")`)
        this.changeSexButton = page.locator(`span:text("Change") > span:text("sex registered at birth")`).first()
        this.changeGenderButton = page.locator(`span:text("Change") > span:text("gender identity same as sex registered at birth")`)
        this.changeEthinictyButton = page.locator(`span:text("Change") > span:text("ethnic group")`)
        this.changeEthnicGroupButton = page.locator(`span:text("Change") > span:text("Ethnic background")`)
        this.changeHealthConditionsButton = page.locator(`span:text("Change") > span:text("long-term conditions or illnesses")`)
        this.changeAreasOfResearchButton = page.locator(`span:text("Change") > span:text("Areas of research")`)
    }

    // -- on load methods
    async assertButtonsVisible() {
        await assertComponentsVisible([
            this.completeRegistrationButton,
            this.changeHomeAddressButton,
            this.changePhoneNumberButton,
            this.changeSexButton,
            this.changeGenderButton,
            this.changeEthinictyButton,
            this.changeEthnicGroupButton,
            this.changeHealthConditionsButton,
            this.changeAreasOfResearchButton,
        ])
    }

    async assertTextVisible() {
        await assertComponentsVisible([this.progressDisplay, this.completeRegistrationPageHeading, this.completeRegistrationHintText])
    }

    async assertDetailsGridVisible() {
        await assertComponentsVisible([this.detailsGrid])
    }
}
