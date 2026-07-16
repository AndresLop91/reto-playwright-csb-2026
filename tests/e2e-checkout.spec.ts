import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

test.describe('Compra de extremo a extremo (E2E)', () => {
  test('Compra completa (Flujo E2E Obligatorio)', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const email = `e2e.candidato.${Date.now()}@test.com`;

    // 1. Registrar Usuario
    await homePage.navigateTo('/');
    await homePage.openConsentModal();
    await homePage.clickLogin();
    await loginPage.initiateSignup('QA E2E Tester', email);
    await loginPage.completeSignup({
      password: 'Password123', day: '10', month: 'May', year: '1990',
      firstName: 'QA', lastName: 'Tester', address: 'Calle E2E', country: 'Canada',
      state: 'Ontario', city: 'Toronto', zipcode: 'M5V 2T6', mobile: '3001234567'
    });
    await expect(loginPage.accountCreatedHeader).toBeVisible();
    await loginPage.clickContinue();
    await expect(homePage.logoutMenu).toBeVisible();

    // 2. Agregar 2 productos
    await homePage.clickProducts();
    
    await page.locator('.single-products').first().hover();
    await page.locator('.product-overlay .add-to-cart').first().click();
    await productsPage.continueShoppingButton.click();
    
    await page.locator('.single-products').nth(1).hover();
    await page.locator('.product-overlay .add-to-cart').nth(1).click();
    await productsPage.continueShoppingButton.click();

    // 3. Ir al carrito de compras
    await homePage.clickCart();
    await expect(cartPage.cartRows).toHaveCount(2);
    await cartPage.proceedToCheckout();

    // 4. Pagar
    await checkoutPage.placeOrderButton.click();
    await checkoutPage.fillPaymentAndSubmit({
      name: 'QA Tester',
      number: '4111 1111 1111 1111',
      cvc: '123',
      expiration: '12/30'
    });

    // 5. Verificar confirmación de orden
    await expect(checkoutPage.successMessage).toContainText('Order Placed!');
  });
});