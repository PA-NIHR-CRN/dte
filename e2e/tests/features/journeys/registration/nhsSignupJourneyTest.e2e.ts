import { test } from "../../../../hooks/CustomFixtures";

test.describe("Name page journey", () => {
  test("Name page renders correctly", async ({ namePage }) => {
    await test.step("I have navigated to the name page", async () => {
      await namePage.goTo();
    });
    await test.step("I can see the components correctly rendered", async () => {
      await namePage.componentsVisible();
      await namePage.correctContent();
    });
    await test.step("I will fill in the first and last name inputs", async () => {
      const firstName = "first name test";
      const lastName = "last name test";
      await namePage.fillFirstName(firstName);
      await namePage.fillLastName(lastName);
    });
    await test.step("I will then press the continue button to move to the next page", async () => {
      await namePage.clickContinue();
    });
  });
});
