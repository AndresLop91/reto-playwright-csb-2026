import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly placeOrderButton: Locator;
  
  // Pasarela de Pago
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;
  
  // Confirmación
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.successMessage = page.locator('[data-qa="order-placed"] b');
  }

  async fillPaymentAndSubmit(card: any) {
    await this.nameOnCardInput.fill(card.name);
    await this.cardNumberInput.fill(card.number);
    await this.cvcInput.fill(card.cvc);
    const [month, year] = card.expiration.split('/');
    await this.expiryMonthInput.fill(month);
    await this.expiryYearInput.fill(year);
    await this.payButton.click();
  }
}