import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Home y Navegación', () => {
  test('Abrir la página principal', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    await homePage.openConsentModal();
    await expect(homePage.homeTitle).toBeVisible();
  });

  test('Ir a la página de productos desde el menú', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    await homePage.openConsentModal();
    await homePage.clickProducts();
    await expect(page).toHaveURL(/.*products/);
  });
});