import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://automationexercise.com', // Configuración externalizada
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Captura Pantalla solo en fallo 
    video: 'retain-on-failure',     // Grabar Video solo en fallo
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});