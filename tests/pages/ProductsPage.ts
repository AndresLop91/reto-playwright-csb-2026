import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsTitle: Locator;
  readonly firstProductViewDetail: Locator;
  
  // Detalle de Producto
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartModalLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.getByRole('heading', { name: 'Searched Products' });
    this.firstProductViewDetail = page.locator('.choose > .nav > li > a').first();
    
    this.productName = page.locator('.product-information > h2');
    this.productPrice = page.locator('.product-information span').filter({ hasText: 'Rs.' }).first();
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartModalLink = page.getByRole('link', { name: 'View Cart' });
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async addCurrentProductToCart() {
    await this.addToCartButton.click();
  }
}