import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

test.describe('Autenticación exitosa', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  const uniqueEmail = `qa.candidato.${Date.now()}@test.com`; // Registro de email único

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigateTo('/');
    await homePage.openConsentModal();
    await homePage.clickLogin();
  });

  test('Registrar un usuario nuevo con email único', async () => {
    await loginPage.initiateSignup('QA Candidato', uniqueEmail);
    await loginPage.completeSignup({
      password: 'Password123',
      day: '10',
      month: 'May',
      year: '1990',
      firstName: 'QA',
      lastName: 'Tester',
      address: 'Calle Prueba 123',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'M5V 2T6',
      mobile: '3001234567'
    });
    // Aserción robusta de éxito
    await expect(loginPage.accountCreatedHeader).toBeVisible();
  });

  test('Login con credenciales incorrectas (Caso Negativo)', async () => {
    await loginPage.login('invalido@correo.com', 'ClaveFalsa123');
    await expect(loginPage.loginErrorMessage).toContainText('Your email or password is incorrect!');
  });

  test('Cerrar sesión', async () => {
    // Primero nos registramos rápidamente
    await loginPage.initiateSignup('QA Auxiliar', `aux.${Date.now()}@test.com`);
    await loginPage.completeSignup({
      password: 'Password123', day: '1', month: 'January', year: '2000',
      firstName: 'Aux', lastName: 'Test', address: 'Calle 1', country: 'Canada',
      state: 'Ontario', city: 'Toronto', zipcode: 'M5V 2T6', mobile: '123'
    });
    await loginPage.clickContinue();
    await expect(homePage.logoutMenu).toBeVisible();
    await homePage.clickLogout();
    await expect(loginPage.loginEmailInput).toBeVisible(); // Asegura retorno a login
  });
});