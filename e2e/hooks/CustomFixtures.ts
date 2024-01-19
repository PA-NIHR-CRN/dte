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
});

export { expect } from "@playwright/test";
