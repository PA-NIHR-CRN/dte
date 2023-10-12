import { expect, Page, test } from "@playwright/test";
import {
  acceptCookie,
  deleteAllParticipants,
  getUserByEmail,
  getUsers,
  headingCheck,
  invisibleTextCheck,
  loaderRemove,
  setCookie,
  testEmail,
  textCheck,
} from "../src/Helper/e2e-test-utils";
import signInOptionsCheck from "./pages/sign-in-options";
import registerCheck from "./pages/register";
import footerCheck from "./pages/layout/footer";
import headerCheck from "./pages/layout/header";
import dateOfBirthCheck from "./pages/stageOne/dateOfBirth";
import nameCheck from "./pages/stageOne/name";
import emailCheck from "./pages/stageOne/email";
import passwordCheck from "./pages/stageOne/password";
import consentCheck from "./pages/stageOne/consent";
import checkEmailCheck from "./pages/stageOne/checkEmail";
import signInCheck from "./pages/sign-in";

const testPassword = "MyTestPassword1!";

const user = {
  email: testEmail,
  password: testPassword,
  firstName: "Test",
  lastName: "Runner",
  dateOfBirth: {
    day: "10",
    month: "10",
    year: "1990",
  },
  postcode: "BT1 1AA",
  address: "ROYAL MAIL 20 DONEGALL QUAY BELFAST BT1 1AA",
  mobileNumber: "07777777777",
  phoneNumber: "02877777777",
  nhsNumber: "1234567890",
  sex: "Male",
  genderAtBirth: "Yes",
};

const convertToMonth = (month: string) => {
  switch (month) {
    case "01":
      return "January";
    case "02":
      return "February";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "August";
    case "09":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    default:
      return "December";
  }
};

test.describe("Registration process", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Stage One User registration", async () => {
    await page.goto("http://localhost:3000/Participants/Options");
    await acceptCookie(page);
    await headerCheck(page);
    await footerCheck(page);

    await signInOptionsCheck(page);
    await page.getByRole("link", { name: "Register" }).click();

    await registerCheck(page);
    await page
      .getByRole("link", { name: "Register with email address" })
      .click();

    await nameCheck(page);
    await page.getByLabel("First name").fill(user.firstName);
    await page.getByLabel("Last name").fill(user.lastName);
    await page.getByRole("button", { name: "Continue" }).click();

    await dateOfBirthCheck(page);
    await page.getByLabel("Day").fill(user.dateOfBirth.day);
    await page.getByLabel("Month").fill(user.dateOfBirth.month);
    await page.getByLabel("Year").fill(user.dateOfBirth.year);
    await page.getByRole("button", { name: "Continue" }).click();

    await emailCheck(page);
    await page.getByLabel("Email address").fill(user.email);
    await page.getByRole("button", { name: "Continue" }).click();

    await loaderRemove(page);

    await passwordCheck(page);
    await page.getByLabel("Create your password").fill(user.password);
    await expect(page.getByLabel("Create your password")).toHaveValue(
      user.password
    );
    await page.getByLabel("Confirm your password").fill(user.password);
    await page.getByRole("button", { name: "Continue" }).click();

    await consentCheck(page);
    await page
      .getByText(
        "I confirm that I have read and understood the Be Part of Research Privacy Policy"
      )
      .click();
    await expect(
      page.getByText(
        "I confirm that I have read and understood the Be Part of Research Privacy Policy"
      )
    ).toBeChecked();
    await page
      .getByRole("button", { name: "Yes, I consent and wish to register now" })
      .click();

    await loaderRemove(page);

    await checkEmailCheck(page, user.email);

    await page.goto("http://localhost:3000/UserLogin");
    await acceptCookie(page);
    await signInCheck(page);
    await page.getByLabel("Email address").fill(user.email);
    await page.getByLabel("Password", { exact: true }).fill(user.password);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    await loaderRemove(page);

    await headingCheck(page, "What is your home address?");
    await page.getByLabel("Postcode").click();
    await page.getByLabel("Postcode").fill(user.postcode);
    await page.getByRole("button", { name: "Find address" }).click();
    await loaderRemove(page);
    await page
      .getByRole("combobox", { name: "Select your address" })
      .selectOption("1");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Mobile number").fill(user.mobileNumber);
    await page.getByLabel("Landline number").fill(user.phoneNumber);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("radio", { name: "I am Male" }).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .getByRole("radio", {
        name: "Yes, the gender I identify with is the same as my registered sex at birth",
      })
      .check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .getByRole("radio", {
        name: "The ethnic group I most closely identify as is White",
      })
      .check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .getByRole("radio", {
        name: "My background is most closely described as Irish",
        exact: true,
      })
      .check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .getByRole("radio", {
        name: "Yes, I have a physical or mental health condition that has, or is expected to last more than 12 months",
      })
      .check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .getByRole("radio", {
        name: "Yes, my condition reduces my ability to carry out day to day activities a little",
      })
      .check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Areas of research").click();
    await page.getByLabel("Areas of research").fill("covi");
    await page.getByLabel("Coronavirus (COVID-19)").check();
    await page.getByLabel("Areas of research").fill("mnd");
    await page.getByLabel("MND").check();
    await page.getByRole("button", { name: "Continue" }).click();
    await loaderRemove(page);
    await textCheck(page, user.address);
    await textCheck(page, user.mobileNumber);
    await textCheck(page, user.phoneNumber);
    await textCheck(page, user.sex);
    await page.getByText("Coronavirus (COVID-19)MND").click();
    await page.getByRole("button", { name: "Complete registration" }).click();
    await page
      .getByRole("heading", {
        name: "Thank you for registering for Be Part of Research",
      })
      .click();
    await page.getByRole("link", { name: "Go to my account" }).click();
    await page.getByRole("heading", { name: "My account" }).click();
    await page.getByRole("link", { name: "Account settings" }).click();
    await page.getByText(user.email).click();
    await page.getByRole("link", { name: "Back", exact: true }).click();
    await page.getByRole("link", { name: "Areas of research" }).click();
    await page.getByRole("button", { name: "Cancel" }).click();
    await page.getByRole("link", { name: "Personal details" }).click();
    await headingCheck(page, "Personal details");
    await textCheck(page, `${user.firstName} ${user.lastName}`);
    await textCheck(page, user.address);
    await textCheck(page, user.mobileNumber);
    await textCheck(page, user.phoneNumber);
    await textCheck(
      page,
      `${user.dateOfBirth.day} ${convertToMonth(user.dateOfBirth.month)} ${
        user.dateOfBirth.year
      }`
    );

    await page.getByText("Male").click();
    await page.getByText("Yes").first().click();
    await page.getByText("White").click();
    await page.getByText("Irish").click();
    await page.getByText("Yes").nth(1).click();
    await page.getByText("Yes, a little").click();
    await page.getByRole("link", { name: "Back", exact: true }).click();
    await page
      .getByRole("link", { name: "Be Part of Research Newsletter" })
      .click();
    await page
      .getByRole("heading", { name: "Be Part of Research Newsletter" })
      .click();
    await page.getByRole("link", { name: "Back", exact: true }).click();
    await page
      .getByRole("link", { name: "Close your account", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Close your account", exact: true })
      .click();
    await page.getByRole("button", { name: "Confirm", exact: true }).click();
    await headingCheck(page, "Your account has been closed");
    await textCheck(page, "Your personal data has been deleted");
    await textCheck(page, "Thank you for your interest in Be Part of Research");
    await page.goto("http://localhost:3000/UserLogin");
    await acceptCookie(page);
    await signInCheck(page);

    await page.getByLabel("Email address").fill(user.email);
    await page.getByLabel("Password", { exact: true }).fill(user.password);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await headingCheck(page, "There is a problem");
    await textCheck(
      page,
      "Enter the email address and password for a registered user account."
    );
    await textCheck(
      page,
      "If you registered using NHS login use the back button above and select NHS login to sign in."
    );
  });

  // test("Stage 2 registration", async () => {});
  //
  // test("Logout", async () => {});
  //
  // test("Close account", async () => {});
  //
  // test("Login with closed account", async () => {});
});
