import { Locator, Page, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly view: Locator;
  readonly categorySelect: Locator;
  readonly filterTags: Locator;
  readonly priceFromInput: Locator;
  readonly preiceToInput: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.view = this.page.getByTestId("products-view");
    this.categorySelect = this.view.getByTestId("category-select");
    this.filterTags = this.view.getByTestId("filter-tag");
    this.priceFromInput = this.view.getByTestId("price-from-input");
    this.priceFromInput = this.view.getByTestId("price-to-input");
    this.products = this.view.getByTestId("product");
  }

  async goTo() {
    await this.page.goto("/products");
  }

  async assertIsVisible() {
    await expect(this.view).toBeVisible();
  }

  async assertCountOfProductsGreatherThan(count: number) {
    const productsCount = await this.products.count();
    expect(productsCount).toBeGreaterThan(count);
  }
}
