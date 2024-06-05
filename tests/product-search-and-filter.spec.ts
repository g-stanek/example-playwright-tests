import { test as _test, expect } from "@playwright/test";
import { ProductsPage } from "../pages";
import { Product } from "../pages/panels";
import { USER } from "../fixtures/user";

type TestProps = {
  productsPage: ProductsPage;
};
const test = _test.extend<TestProps>({
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

test.describe("Product Search and Filter", () => {
  test.use({ storageState: USER.file });
  test("should search and filter products", async ({ productsPage }) => {
    await productsPage.goTo();
    await productsPage.assertIsVisible();
    await productsPage.categorySelect.selectOption("electronics");
    await productsPage.filterTags.getByText("New").click();
    await productsPage.priceFromInput.fill("100");
    await productsPage.preiceToInput.fill("150");
    await productsPage.assertCountOfProductsGreatherThan(0);
    for (const productLocator of await productsPage.products.all()) {
      const product = new Product(productLocator);
      await expect(product.name).toBeVisible();
      await expect(product.tags.getByText("New")).toBeVisible();
      await expect(product.tags.getByText("Electronics")).toBeVisible();
      await product.assertProductPrice({ from: 100, to: 150 });
    }
  });
});
