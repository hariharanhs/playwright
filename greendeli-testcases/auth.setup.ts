import { test as setup, expect } from '@playwright/test';
import testData from './partner/partner_data.json';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto(testData.loginCredentials.url);
  await page.getByPlaceholder('Enter your email ID').fill(testData.loginCredentials.email);
  await page.getByPlaceholder('Enter your password').fill(testData.loginCredentials.password);
  
  await Promise.all([
    page.waitForURL('**/dashboard'),
    page.getByRole('button', { name: /login/i }).click()
  ]);
  
  await expect(page).toHaveURL(/.*dashboard/);

  // Save authenticated storage state (cookies/localStorage) to disk
  await page.context().storageState({ path: authFile });
});