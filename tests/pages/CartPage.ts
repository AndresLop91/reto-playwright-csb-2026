import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartRows: Locator;
  readonly deleteItemButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByText('Proceed To Checkout');
    this.cartRows = page.locator('tbody tr');
    this.deleteItemButtons = page.locator('.cart_quantity_delete');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeFirstItem() {
    await this.deleteItemButtons.first().click();
  }
}