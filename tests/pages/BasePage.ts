import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string) {
    // Bloquear Google Ads y otros scripts para evitar que los anuncios superpuestos intercepten los clics
    await this.page.route(/(googleads|doubleclick|googlesyndication|google-analytics)/, route => route.abort());
    await this.page.goto(path);
  }
}