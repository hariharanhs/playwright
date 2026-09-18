import { test, expect } from '@playwright/test';
import testData from './login_data.json';

test.describe('Login Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.enminvithaigal.in/greendeli');
  });

  test.describe('Valid Scenarios', () => {
    for (const data of testData.positiveTests) {
      test(data.testName, async ({ page }) => {
        // Uses the dynamic placeholder from JSON if available, otherwise defaults to email field
        const emailPlaceholder = data.htmlElementEmail || 'Enter your email ID';
        
        await page.getByPlaceholder(emailPlaceholder).fill(data.email);
        await page.getByPlaceholder('Enter your password').fill(data.password);
        await page.getByRole('button', { name: /login/i }).click();

        await expect(page.getByText(data.expectedErrorMessage)).toBeVisible();
        await expect(page).toHaveURL(data.expectedUrlSubstring);
      });
    }
  });

  test.describe('Invalid Scenarios', () => {
    for (const data of testData.negativeTests) {
      test(data.testName, async ({ page }) => {
        await page.getByPlaceholder('Enter your email ID').fill(data.email);
        await page.getByPlaceholder('Enter your password').fill(data.password);
        await page.getByRole('button', { name: /login/i }).click();

        await expect(page.getByText(data.expectedErrorMessage)).toBeVisible();
      });
    }
  });

});