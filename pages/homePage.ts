import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly view: Locator;

  constructor(page: Page) {
    this.page = page;
    this.view = this.page.getByTestId("home-view");
  }

  async assertIsVisible() {
    await expect(this.view).toBeVisible();
  }

  async assertUrl() {
    await expect(this.page).toHaveURL("/homePage");
  }
}
