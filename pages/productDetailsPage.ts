import { Locator, Page, expect } from "@playwright/test";
import { Product } from "./panels";

export class ProductDetailsPage {
  readonly page: Page;
  readonly view: Locator;
  readonly addToShoppingCartButton: Locator;
  readonly successInfo: Locator;
  readonly product: Product;

  constructor(page: Page) {
    this.page = page;
    this.view = this.page.getByTestId("product-details-view");
    this.addToShoppingCartButton = this.view.getByTestId(
      "add-to-shopping-cart-button"
    );
    this.successInfo = this.view.getByTestId("success-info");
    this.product = new Product(this.view);
  }

  async assertUrl() {
    await expect(this.page).toHaveURL(/\/products\/product\/[0-9]*$/);
  }

  async assertIsVisible() {
    await expect(this.view).toBeVisible();
  }
}
