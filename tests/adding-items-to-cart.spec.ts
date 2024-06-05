import { test as _test, expect } from "@playwright/test";
import { ProductDetailsPage, ProductsPage, ShoppingCartPage } from "../pages";
import { USER } from "../fixtures/user";
import { Product } from "../pages/panels";

type TestProps = {
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  shoppingCartPage: ShoppingCartPage;
};
const test = _test.extend<TestProps>({
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});

test.beforeEach(async ({ productsPage }) => {});

test.describe("Adding Items to Cart:", () => {
  test.use({ storageState: USER.file });
  test("shoud be able to add product to shopping cart", async ({
    productsPage,
    productDetailsPage,
    shoppingCartPage,
  }) => {
    await productsPage.goTo();
    await productsPage.assertIsVisible();
    await productsPage.categorySelect.selectOption("electronics");
    await productsPage.assertCountOfProductsGreatherThan(0);
    const productFromList = new Product(productsPage.products.first());
    const productName = await productFromList.name.allInnerTexts();
    await productFromList.openDetails();
    await productDetailsPage.assertUrl();
    await productDetailsPage.assertIsVisible();
    await expect(productDetailsPage.product.name).toHaveText(productName);
    await productDetailsPage.addToShoppingCartButton.click();
    await expect(productDetailsPage.successInfo).toHaveText(
      "Product successfully added to cart"
    );
    await shoppingCartPage.goTo();
    await shoppingCartPage.assertIsVisible();
    await expect(shoppingCartPage.products).toHaveCount(1);
    const productInShoppingCart = new Product(
      shoppingCartPage.products.first()
    );
    await expect(productInShoppingCart.name).toHaveText(productName);
  });
});
