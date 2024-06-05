import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly view: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly successInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.view = this.page.getByTestId("singin-view");
    this.emailInput = this.view.getByTestId("email-input");
    this.passwordInput = this.view.getByTestId("password-input");
    this.submitButton = this.view.getByTestId("singin-button");
    this.successInfo = this.view.getByTestId("singin-success");
  }

  async assertIsVisible() {
    await expect(this.view).toBeVisible();
  }

  async assertUrl() {
    await expect(this.page).toHaveURL("/signin");
  }
}
