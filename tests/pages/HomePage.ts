import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly consentButton: Locator; // Para saltar el modal de cookies/consentimiento si aparece
  readonly homeTitle: Locator;
  readonly productsMenu: Locator;
  readonly loginMenu: Locator;
  readonly cartMenu: Locator;
  readonly logoutMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.consentButton = page.getByRole('button', { name: 'Consent' });
    this.homeTitle = page.getByRole('heading', { name: /Automation\s*Exercise/i });
    this.productsMenu = page.getByRole('link', { name: /Products/i });
    this.loginMenu = page.getByRole('link', { name: /Signup \/ Login/i });
    this.cartMenu = page.getByRole('link', { name: /Cart/i }).first();
    this.logoutMenu = page.getByRole('link', { name: /Logout/i });
  }

  async openConsentModal() {
    try {
      if (await this.consentButton.isVisible({ timeout: 3000 })) {
        await this.consentButton.click();
      }
    } catch (e) {
      // Ignorar si no aparece el banner de cookies
    }
  }

  async clickProducts() {
    await this.productsMenu.click();
  }

  async clickLogin() {
    await this.loginMenu.click();
  }

  async clickCart() {
    await this.cartMenu.click();
  }

  async clickLogout() {
    await this.logoutMenu.click();
  }
}