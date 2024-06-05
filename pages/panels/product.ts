import { Locator, Page, expect } from "@playwright/test";

export class Product {
  readonly product: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly tags: Locator;
  readonly description: Locator;

  constructor(product: Locator) {
    this.product = product;
    this.name = this.product.getByTestId("name");
    this.price = this.product.getByTestId("price");
    this.tags = this.product.getByTestId("tag");
    this.description = this.product.getByTestId("description");
  }

  async assertProductPrice({ from, to }: { from: number; to: number }) {
    await expect(this.price).toBeVisible();
    const price = await this.price.getByTestId("price").innerText();
    expect(+price).toBeGreaterThanOrEqual(from);
    expect(+price).toBeLessThanOrEqual(to);
  }

  async openDetails() {
    await this.product.click();
  }
}
