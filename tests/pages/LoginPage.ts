import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Login Form
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  // Signup Form
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  // Account Creation Form (Detalles)
  readonly genderMrRadio: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;
  readonly createAccountButton: Locator;
  
  // Mensajes de Éxito
  readonly accountCreatedHeader: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginEmailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.loginPasswordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginErrorMessage = page.locator('form').filter({ hasText: 'Login' }).locator('p');

    this.signupNameInput = page.getByPlaceholder('Name');
    this.signupEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });

    this.genderMrRadio = page.getByLabel('Mr.');
    this.passwordInput = page.getByLabel('Password *');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.firstNameInput = page.getByLabel('First name *');
    this.lastNameInput = page.getByLabel('Last name *');
    this.addressInput = page.getByLabel('Address * (Street address, P.');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.getByLabel('State *');
    this.cityInput = page.getByLabel('City *');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileInput = page.getByLabel('Mobile Number *');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.accountCreatedHeader = page.getByText('Account Created!');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async login(email: string, pass: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    await this.loginButton.click();
  }

  async initiateSignup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async completeSignup(data: any) {
    await this.genderMrRadio.check();
    await this.passwordInput.fill(data.password);
    await this.daysSelect.selectOption(data.day);
    await this.monthsSelect.selectOption(data.month);
    await this.yearsSelect.selectOption(data.year);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.countrySelect.selectOption(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileInput.fill(data.mobile);
    await this.createAccountButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}