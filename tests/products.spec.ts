import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';

test.describe('Productos y Carrito de compras', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await homePage.navigateTo('/');
    await homePage.openConsentModal();
  });

  test('Buscar un producto', async () => {
    await homePage.clickProducts();
    await productsPage.searchProduct('Top');
    await expect(productsPage.searchedProductsTitle).toBeVisible();
  });

  test('Abrir detalle de un producto', async () => {
    await homePage.clickProducts();
    await productsPage.firstProductViewDetail.click();
    await expect(productsPage.productName).toBeVisible();
    await expect(productsPage.productPrice).toBeVisible();
    await expect(productsPage.addToCartButton).toBeVisible();
  });

  test('Agregar un producto al carrito', async () => {
    await homePage.clickProducts();
    await productsPage.firstProductViewDetail.click();
    await productsPage.addCurrentProductToCart();
    await productsPage.viewCartModalLink.click();
    await expect(cartPage.cartRows).toHaveCount(1);
  });

  test('Agregar dos productos distintos', async ({ page }) => {
    await homePage.clickProducts();

    // Producto 1
    await page.locator('.single-products').first().hover();
    await page.locator('.product-overlay .add-to-cart').first().click();
    await productsPage.continueShoppingButton.click();

    // Producto 2 (buscamos el segundo elemento en la cuadrícula de productos)
    await page.locator('.single-products').nth(1).hover();
    await page.locator('.product-overlay .add-to-cart').nth(1).click();
    await productsPage.continueShoppingButton.click();

    await homePage.clickCart();
    await expect(cartPage.cartRows).toHaveCount(2);
  });

  test('Eliminar un producto del carrito', async () => {
    await homePage.clickProducts();
    await productsPage.firstProductViewDetail.click();
    await productsPage.addCurrentProductToCart();
    await productsPage.viewCartModalLink.click();

    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.removeFirstItem();
    await expect(cartPage.cartRows).toHaveCount(0);
  });
});