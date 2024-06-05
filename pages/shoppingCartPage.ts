import { Locator, Page, expect } from "@playwright/test";
import { Product } from "./panels";

export class ShoppingCartPage {
  readonly page: Page;
  readonly view: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.view = this.page.getByTestId("shopping-cart-view");
    this.products = this.view.getByTestId("product");
  }

  async goTo() {
    await this.page.goto("/shoppingCart");
  }

  async assertIsVisible() {
    await expect(this.view).toBeVisible();
  }
}
