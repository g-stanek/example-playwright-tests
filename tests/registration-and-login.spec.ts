import { test as _test, expect } from "@playwright/test";
import { HomePage, LoginPage, RegistrationPage } from "../pages";

type TestProps = {
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  homePage: HomePage;
};

const test = _test.extend<TestProps>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goTo();
    await registrationPage.assertIsVisible();
    await use(registrationPage);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

const NOT_VALID_REGISTRATION_DATAS = [
  {
    email: "test@test",
    password: "12345",
    repeatPassword: "12345",
    error: "Email is invalid",
  },
  {
    email: "test@test.pl",
    password: "12",
    repeatPassword: "12",
    error: "Password is too short",
  },
  {
    email: "test@test.pl",
    password: "12345",
    repeatPassword: "123456abc",
    error: "Passwords are not the same",
  },
];

const CORRECT_REGISTRATION_DATA = {
  email: `test-${Date.now()}@test.pl`,
  password: "12345",
};

test.describe("User Registration and Login", () => {
  for (const data of NOT_VALID_REGISTRATION_DATAS) {
    test(`should not signup with not valid data email: ${data.email} password: ${data.password}`, async ({
      registrationPage,
    }) => {
      await registrationPage.emailInput.fill(data.email);
      await registrationPage.passwordInput.fill(data.password);
      await registrationPage.repeatPasswordInput.fill(data.repeatPassword);
      await registrationPage.submitButton.click();
      await expect(registrationPage.errorInfo).toBeVisible();
      await expect(registrationPage.errorInfo).toHaveText(data.error);
    });
  }

  test("should signup, login and redirect to home page", async ({
    registrationPage,
    loginPage,
    homePage,
  }) => {
    await registrationPage.emailInput.fill(CORRECT_REGISTRATION_DATA.email);
    await registrationPage.passwordInput.fill(
      CORRECT_REGISTRATION_DATA.password
    );
    await registrationPage.repeatPasswordInput.fill(
      CORRECT_REGISTRATION_DATA.password
    );
    await registrationPage.submitButton.click();
    await expect(registrationPage.errorInfo).not.toBeVisible();
    await expect(registrationPage.successInfo).toBeVisible();
    await expect(registrationPage.successInfo).toHaveText(
      "Signup successfully completed"
    );
    await loginPage.assertUrl();
    await loginPage.assertIsVisible();
    await loginPage.emailInput.fill(CORRECT_REGISTRATION_DATA.email);
    await loginPage.passwordInput.fill(CORRECT_REGISTRATION_DATA.password);
    await loginPage.submitButton.click();
    await expect(loginPage.successInfo).toHaveText(
      "Signin successfully completed"
    );
    await homePage.assertUrl();
    await homePage.assertIsVisible();
  });
});
