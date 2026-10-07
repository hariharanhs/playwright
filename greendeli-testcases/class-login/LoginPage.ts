import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get emailInput(): Locator {
    return this.page.getByPlaceholder('Enter your email ID');
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder('Enter your password');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: /login/i });
  }

  /**
   * Navigates to the login page and waits for full network idle (SPA hydration)
   */
  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Fills credentials and submits
   */
  async login(email: string, password: string, customEmailPlaceholder?: string) {
    const emailField = (customEmailPlaceholder && customEmailPlaceholder.trim() !== '')
      ? this.page.getByPlaceholder(customEmailPlaceholder)
      : this.emailInput;

    // Explicitly wait for the input element to be attached and visible
    await emailField.first().waitFor({ state: 'visible', timeout: 15000 });
    await emailField.first().fill(email);

    await this.passwordInput.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.first().fill(password);

    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.page.getByText(expectedMessage)).toBeVisible({ timeout: 10000 });
  }

  async verifyRedirectUrl(expectedUrlSubstring: string) {
    await expect(this.page).toHaveURL(expectedUrlSubstring, { timeout: 10000 });
  }
}