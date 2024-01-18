import { Locator, Page, expect } from "@playwright/test";

export default class DateOfBirthPage {
  readonly page: Page;
  // Text
  readonly progressDisplay: Locator;
  readonly DoBPageHeading: Locator;
  readonly exampleText: Locator;
  readonly summaryTextPreview: Locator;
  readonly ageRestrictionText: Locator;
  readonly summaryTextPart1: Locator;
  readonly summaryTextPart2: Locator;
  // Form
  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;
  readonly dayInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  // --- Form Errors --- //
  readonly ageRestrictionError: Locator;
  // invalid inputs into fields errors
  readonly notRealDateError: Locator;
  readonly allFieldsInvalidError: Locator;
  readonly monthYearFieldsInvalidError: Locator;
  readonly dayYearFieldsInvalidError: Locator;
  readonly yearFieldInvalidError: Locator;
  readonly dayMonthFieldsInvalidError: Locator;
  readonly dayFieldInvalidError: Locator;
  readonly monthFieldInvalidError: Locator;
  // empty input fields errors
  readonly allFieldsEmptyError: Locator;
  readonly monthYearFieldsEmptyError: Locator;
  readonly dayYearFieldsEmptyError: Locator;
  readonly yearFieldEmptyError: Locator;
  readonly dayMonthFieldsEmptyError: Locator;
  readonly dayFieldEmptyError: Locator;
  readonly monthFieldEmptyError: Locator;
  // Buttons
  readonly backButton: Locator;
  readonly continueButton: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    // Text
    this.progressDisplay = page.getByText("8% complete");
    this.DoBPageHeading = page.getByRole("heading", {
      name: "What is your date of birth?",
    });
    this.exampleText = page.getByText("For example, 31 3 1980");
    this.ageRestrictionText = page.getByText(
      "You must be 18 or over to use this service"
    );
    this.summaryTextPreview = page.getByText("Why we are asking this question");
    this.summaryTextPart1 = page.getByText(
      "Many studies want to make sure they have people of different ages taking part in research studies, and some are looking for specific age groups only."
    );
    this.summaryTextPart2 = page.getByText(
      "You have to be 18 or over to sign up for an account with Be Part of Research."
    );
    // --- FORM COMPONENTS --- //
    this.dayLabel = page.getByText("Day");
    this.monthLabel = page.getByText("Month");
    this.yearLabel = page.getByText("Year");
    this.dayInput = page.getByLabel("Day");
    this.monthInput = page.getByLabel("Month");
    this.yearInput = page.getByLabel("Year");
    // Form invalid input errors
    this.ageRestrictionError = page.getByRole("alert", {
      name: "You must be 18 or over to use this service",
    });
    this.allFieldsInvalidError = page.getByRole("alert", {
      name: "Day must be a number between 1 and 31, Month must be number between 1 and 12, Year must be a number that is 1900 or more",
    });
    this.monthYearFieldsInvalidError = page.getByRole("alert", {
      name: "Month must be number between 1 and 12, Year must be a number that is 1900 or more",
    });
    this.dayYearFieldsInvalidError = page.getByRole("alert", {
      name: "Day must be a number between 1 and 31, Year must be a number that is 1900 or more",
    });
    this.yearFieldInvalidError = page.getByRole("alert", {
      name: "Year must be a number that is 1900 or more",
    });
    this.dayMonthFieldsInvalidError = page.getByRole("alert", {
      name: "Day must be a number between 1 and 31, Month must be number between 1 and 12",
    });
    this.dayFieldInvalidError = page.getByRole("alert", {
      name: "Day must be a number between 1 and 31",
    });
    this.monthFieldInvalidError = page.getByRole("alert", {
      name: "Month must be number between 1 and 12",
    });
    this.notRealDateError = page.getByRole("alert", {
      name: "Date of birth must be a real date",
    });
    // Form empty input errors
    this.allFieldsEmptyError = page.getByRole("alert", {
      name: "Enter a date of birth",
    });
    this.monthYearFieldsEmptyError = page.getByRole("alert", {
      name: "Date of birth must include a month and year",
    });
    this.dayYearFieldsEmptyError = page.getByRole("alert", {
      name: "Date of birth must include a day and year",
    });
    this.yearFieldEmptyError = page.getByRole("alert", {
      name: "Date of birth must include a year",
    });
    this.dayMonthFieldsEmptyError = page.getByRole("alert", {
      name: "Date of birth must include a day and month",
    });
    this.dayFieldEmptyError = page.getByRole("alert", {
      name: "Date of birth must include a day",
    });
    this.monthFieldEmptyError = page.getByRole("alert", {
      name: "Date of birth must include a month",
    });
    // Buttons
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.backButton = page.getByRole("link", { name: "Back" });
  }

  // --- LOAD PAGE METHODS --- //
  async goTo() {
    await this.page.goto("Participants/Register/Questions");
  }

  // --- ON LOAD METHODS --- //
  // check button components are visible on load
  async assertButtonsVisible() {
    await expect(this.backButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  // check all text components are visible on load
  async assertTextVisible() {
    await expect(this.progressDisplay).toBeVisible();
    await expect(this.DoBPageHeading).toBeVisible();
    await expect(this.exampleText).toBeVisible();
    await expect(this.ageRestrictionText).toBeVisible();
    await expect(this.summaryTextPreview).toBeVisible();
    await expect(this.summaryTextPart1).toBeVisible();
    await expect(this.summaryTextPart2).toBeVisible();
  }

  // check form components are visible on load
  async assertFormVisible() {
    await expect(this.dayLabel).toBeVisible();
    await expect(this.dayInput).toBeVisible();
    await expect(this.monthLabel).toBeVisible();
    await expect(this.monthInput).toBeVisible();
    await expect(this.yearLabel).toBeVisible();
    await expect(this.yearInput).toBeVisible();
  }

  // Check no error messages visible before continue button pressed
  async assertErrorsHidden() {
    await expect(this.ageRestrictionError).toBeHidden();
    await expect(this.allFieldsInvalidError).toBeHidden();
    await expect(this.monthYearFieldsInvalidError).toBeHidden();
    await expect(this.dayYearFieldsInvalidError).toBeHidden();
    await expect(this.yearFieldInvalidError).toBeHidden();
    await expect(this.dayMonthFieldsInvalidError).toBeHidden();
    await expect(this.dayFieldInvalidError).toBeHidden();
    await expect(this.monthFieldInvalidError).toBeHidden();
    await expect(this.allFieldsEmptyError).toBeHidden();
    await expect(this.monthYearFieldsEmptyError).toBeHidden();
    await expect(this.dayYearFieldsEmptyError).toBeHidden();
    await expect(this.yearFieldEmptyError).toBeHidden();
    await expect(this.dayMonthFieldsEmptyError).toBeHidden();
    await expect(this.dayFieldEmptyError).toBeHidden();
    await expect(this.monthFieldEmptyError).toBeHidden();
  }

  // --- CLICK METHODS --- //
  // check for back button click
  async clickBack() {
    await this.backButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
    // await this.validateInputs();
    // Go to next page if no errors found
  }

  // --- FILLING IN FORM METHODS --- //
  async fillDayField(day: string) {
    await this.dayInput.click();
    await expect(this.dayInput).toBeFocused();
    await this.dayInput.fill(day);
  }

  async fillMonthField(month: string) {
    await this.monthInput.click();
    await expect(this.dayInput).toBeFocused();
    await this.monthInput.fill(month);
  }

  async fillYearField(year: string) {
    await this.yearInput.click();
    await expect(this.yearInput).toBeFocused();
    await this.yearInput.fill(year);
  }

  // --- ERROR CHECKING METHODS --- //
  async checkInputsFilled(day: string, month: string, year: string) {
    const isDayInputEmpty = day.trim() === "";
    const isMonthInputEmpty = month.trim() === "";
    const isYearInputEmpty = year.trim() === "";

    const components = [
      this.allFieldsEmptyError,
      this.dayMonthFieldsEmptyError,
      this.dayFieldEmptyError,
      this.monthYearFieldsEmptyError,
      this.yearFieldEmptyError,
      this.monthFieldEmptyError,
    ];

    const conditions = [
      [isDayInputEmpty, isMonthInputEmpty, isYearInputEmpty],
      [isDayInputEmpty, isMonthInputEmpty, !isYearInputEmpty],
      [isDayInputEmpty, !isMonthInputEmpty, !isYearInputEmpty],
      [!isDayInputEmpty, isMonthInputEmpty, isYearInputEmpty],
      [!isDayInputEmpty, !isMonthInputEmpty, isYearInputEmpty],
      [!isDayInputEmpty, isMonthInputEmpty, !isYearInputEmpty],
    ];

    const errorMessages = [
      "Enter a date of birth",
      "Date of birth must include a day and month",
      "Date of birth must include a day",
      "Date of birth must include a month and year",
      "Date of birth must include a year",
      "Date of birth must include a month",
    ];

    for (let i = 0; i < conditions.length; i++) {
      const component = components[i];
      const condition = conditions[i];
      const errorMessage = errorMessages[i];

      if (condition.every((isTrue) => isTrue)) {
        await expect(component).toHaveText(errorMessage);
        break;
      }
    }
  }

  // check if any input field contains an invalid value
  async checkInvalidInputErrors(day: number, month: number, year: number) {
    const isDayInputInvalid = day < 1 || day > 31;
    const isMonthInputValid = month < 1 || month > 12;
    const isYearInputInvalid = year < 1900;

    const conditions = [
      [isDayInputInvalid, isMonthInputValid, isYearInputInvalid],
      [!isDayInputInvalid, isMonthInputValid, isYearInputInvalid],
      [isDayInputInvalid, !isMonthInputValid, isYearInputInvalid],
      [!isDayInputInvalid, !isMonthInputValid, isYearInputInvalid],
      [isDayInputInvalid, isMonthInputValid, !isYearInputInvalid],
      [isDayInputInvalid, !isMonthInputValid, !isYearInputInvalid],
      [!isDayInputInvalid, isMonthInputValid, !isYearInputInvalid],
    ];

    const errorMessages = [
      "Day must be a number between 1 and 31, Month must be number between 1 and 12, Year must be a number that is 1900 or more",
      "Month must be number between 1 and 12, Year must be a number that is 1900 or more",
      "Day must be a number between 1 and 31, Year must be a number that is 1900 or more",
      "Year must be a number that is 1900 or more",
      "Day must be a number between 1 and 31, Month must be number between 1 and 12",
      "Day must be a number between 1 and 31",
      "Month must be number between 1 and 12",
    ];
  }

  // check if the date given is a real date
  async checkNotRealDateError(day: number, month: number, year: number) {
    const submittedDate = new Date(year, month - 1, day);
    const submittedDateExists =
      submittedDate.getFullYear() === year &&
      submittedDate.getMonth() - 1 === month &&
      submittedDate.getDate() === day;

    !submittedDateExists
      ? await expect(this.notRealDateError).toHaveText(
          "Date of birth must be a real date"
        )
      : await expect(this.notRealDateError).toBeHidden();
  }

  // Check if error message shows when user is too young to register
  async checkAgeRestrictionError(day: number, month: number, year: number) {
    const currentDate: number = Date.now();

    const userDateOfBirth: number = new Date(day, month - 1, year).getDate();

    const userAgeMilleseconds: number = currentDate - userDateOfBirth;
    const userAgeYears = userAgeMilleseconds / (365.25 * 24 * 60 * 60 * 1000);

    if (userAgeYears >= 18) {
      await expect(this.ageRestrictionError).toBeHidden();
    } else {
      await expect(this.ageRestrictionError).toBeVisible();
    }
  }
}
