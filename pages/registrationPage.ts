import { Locator, Page, expect } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly view: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly errorInfo: Locator;
  readonly successInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.view = this.page.getByTestId("registration-view");
    this.emailInput = this.view.getByTestId("email-input");
    this.passwordInput = this.view.getByTestId("password-input");
    this.repeatPasswordInput = this.view.getByTestId("repeat-password-input");
    this.submitButton = this.view.getByTestId("registration-button");
    this.errorInfo = this.view.getByTestId("registration-error");
    this.successInfo = this.view.getByTestId("registration-success");
  }

  async goTo() {
    await this.page.goto("/signup");
  }

  async assertIsVisible() {
    await expect(this.view).toBeVisible();
  }
}
