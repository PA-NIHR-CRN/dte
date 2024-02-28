import { test as base } from "@playwright/test";

import CookieBanner from "../pages/Default/CookieBanner";
import Header from "../pages/Default/Header";
import Footer from "../pages/Default/Footer";
import SignInOptionsPage from "../pages/Default/SignInOptionsPage";
import HomeAddressPage from "../pages/StageTwo/HomeAddressPage";
import NhsLogin from "../pages/NhsLogin";
import MyAccountPage from "../pages/StageTwo/MyAccountPage";
import PersonalDetailsPage from "../pages/StageTwo/PersonalDetailsPage";
import NamePage from "../pages/StageOne/NamePage";
import DateOfBirthPage from "../pages/StageOne/DateOfBirthPage";
import EmailPage from "../pages/StageOne/EmailPage";
import PasswordPolicyPage from "../pages/StageOne/PasswordPolicyPage";
import ConsentPage from "../pages/StageOne/ConsentPage";
import EmailVerificationPage from "../pages/StageOne/EmailVerificationPage";
import EmailVerifiedPage from "../pages/StageTwo/EmailVerifiedPage";
import EnterMobilePage from "../pages/StageTwo/EnterMobilePage";
import VerifyMobilePage from "../pages/StageTwo/VerifyMobilePage";
import AddressPage from "../pages/StageTwo/AddressPage";
import PhoneNumberOptionalPage from "../pages/StageTwo/PhoneNumberOptionalPage";
import SexGenderPage from "../pages/StageTwo/SexGenderPage";
import EthinicityPage from "../pages/StageTwo/EthinicityPage";
import EthnicBackgroundPage from "../pages/StageTwo/EthnicBackground";
import HealthConditionsPage from "../pages/StageTwo/HealthConditionsPage";
import AreasOfResearchPage from "../pages/StageTwo/AreasOfResearchPage";
import CompleteRegistrationPage from "../pages/StageTwo/CompleteRegistrationPage";
import ThankYouPage from "../pages/StageTwo/ThankYouPage";
// Login pages
import LoginPage from "../pages/LoginPages/LoginPage";
import AccountSettingsPage from "../pages/LoginPages/AccountSettingsPage";
import AreasOfResearchAccountPage from "../pages/LoginPages/AreasOfResearchAccountPage";
import ChangeAddressPage from "../pages/LoginPages/ChangeAddressPage";
import ChangeDateOfBirthPage from "../pages/LoginPages/ChangeDateOfBirthPage";
import ChangeEmailPage from "../pages/LoginPages/ChangeEmailPage";
import ChangeNamePage from "../pages/LoginPages/ChangeNamePage";
import ChangeOptionalPhoneNumberPage from "../pages/LoginPages/ChangeOptionalPhoneNumberPage";
import ChangePasswordPage from "../pages/LoginPages/ChangePasswordPage";
import ChangeSexGenderPage from "../pages/LoginPages/ChangeSexGenderPage";
import CloseAccountPage from "../pages/LoginPages/ChangeSexGenderPage";
import NewsletterPage from "../pages/LoginPages/NewsletterPage";
import PersonalDetailsAccountPage from "../pages/LoginPages/PersonalDetailsAccountPage";

type CustomFixtures = {
  cookieBanner: CookieBanner;
  header: Header;
  footer: Footer;
  signInOptionsPage: SignInOptionsPage;
  homeAddressPage: HomeAddressPage;
  nhsLogin: NhsLogin;
  myAccountPage: MyAccountPage;
  personalDetailsPage: PersonalDetailsPage;
  namePage: NamePage;
  dateOfBirthPage: DateOfBirthPage;
  emailPage: EmailPage;
  passwordPolicyPage: PasswordPolicyPage;
  consentPage: ConsentPage;
  emailVerificationPage: EmailVerificationPage;
  emailVerifiedPage: EmailVerifiedPage;
  enterMobilePage: EnterMobilePage;
  verifyMobilePage: VerifyMobilePage;
  addressPage: AddressPage;
  phoneNumberOptionalPage: PhoneNumberOptionalPage;
  sexGenderPage: SexGenderPage;
  ethinicityPage: EthinicityPage;
  ethnicBackgroundPage: EthnicBackgroundPage;
  healthConditionsPage: HealthConditionsPage;
  areasOfResearchPage: AreasOfResearchPage;
  completeRegistrationPage: CompleteRegistrationPage;
  thankYouPage: ThankYouPage;
  // login pages
  loginPage: LoginPage;
  accountSettingsPage: AccountSettingsPage;
  areasOfResearchAccountPage: AreasOfResearchAccountPage;
  changeAddressPage: ChangeAddressPage;
  changeDateOfBirthPage: ChangeDateOfBirthPage;
  changeEmailPage: ChangeEmailPage;
  changeNamePage: ChangeNamePage;
  changeOptionalPhoneNumberPage: ChangeOptionalPhoneNumberPage;
  changePasswordPage: ChangePasswordPage;
  changeSexGenderPage: ChangeSexGenderPage;
  closeAccountPage: CloseAccountPage;
  newsletterPage: NewsletterPage;
  personalDetailsAccountPage: PersonalDetailsAccountPage;
};

export const test = base.extend<CustomFixtures>({
  cookieBanner: async ({ page }, use) => {
    await use(new CookieBanner(page));
  },

  header: async ({ page }, use) => {
    await use(new Header(page));
  },

  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },
  signInOptionsPage: async ({ page }, use) => {
    await use(new SignInOptionsPage(page));
  },
  homeAddressPage: async ({ page }, use) => {
    await use(new HomeAddressPage(page));
  },
  nhsLogin: async ({ page }, use) => {
    await use(new NhsLogin(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  personalDetailsPage: async ({ page }, use) => {
    await use(new PersonalDetailsPage(page));
  },
  namePage: async ({ page }, use) => {
    await use(new NamePage(page));
  },
  dateOfBirthPage: async ({ page }, use) => {
    await use(new DateOfBirthPage(page));
  },
  emailPage: async ({ page }, use) => {
    await use(new EmailPage(page));
  },
  passwordPolicyPage: async ({ page }, use) => {
    await use(new PasswordPolicyPage(page));
  },
  consentPage: async ({ page }, use) => {
    await use(new ConsentPage(page));
  },
  emailVerificationPage: async ({ page }, use) => {
    await use(new EmailVerificationPage(page));
  },
  emailVerifiedPage: async ({ page }, use) => {
    await use(new EmailVerifiedPage(page));
  },
  enterMobilePage: async ({ page }, use) => {
    await use(new EnterMobilePage(page));
  },
  verifyMobilePage: async ({ page }, use) => {
    await use(new VerifyMobilePage(page));
  },
  addressPage: async ({ page }, use) => {
    await use(new AddressPage(page));
  },
  phoneNumberOptionalPage: async ({ page }, use) => {
    await use(new PhoneNumberOptionalPage(page));
  },
  sexGenderPage: async ({ page }, use) => {
    await use(new SexGenderPage(page));
  },
  ethinicityPage: async ({ page }, use) => {
    await use(new EthinicityPage(page));
  },
  ethnicBackgroundPage: async ({ page }, use) => {
    await use(new EthnicBackgroundPage(page));
  },
  healthConditionsPage: async ({ page }, use) => {
    await use(new HealthConditionsPage(page));
  },
  areasOfResearchPage: async ({ page }, use) => {
    await use(new AreasOfResearchPage(page));
  },
  completeRegistrationPage: async ({ page }, use) => {
    await use(new CompleteRegistrationPage(page));
  },
  thankYouPage: async ({ page }, use) => {
    await use(new ThankYouPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountSettingsPage: async ({ page }, use) => {
    await use(new AccountSettingsPage(page));
  },
  areasOfResearchAccountPage: async ({ page }, use) => {
    await use(new AreasOfResearchAccountPage(page));
  },
  changeAddressPage: async ({ page }, use) => {
    await use(new ChangeAddressPage(page));
  },
  changeDateOfBirthPage: async ({ page }, use) => {
    await use(new ChangeDateOfBirthPage(page));
  },
  changeEmailPage: async ({ page }, use) => {
    await use(new ChangeEmailPage(page));
  },
  changeNamePage: async ({ page }, use) => {
    await use(new ChangeNamePage(page));
  },
  changeOptionalPhoneNumberPage: async ({ page }, use) => {
    await use(new ChangeOptionalPhoneNumberPage(page));
  },
});

export { expect } from "@playwright/test";
