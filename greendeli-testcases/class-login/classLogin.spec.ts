import { test } from '@playwright/test';
import { LoginPage } from './LoginPage';
import testData from './login_data.json';

test.describe('Login Module', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://staging.enminvithaigal.in/greendeli');
  });

  test.describe('Valid Scenarios', () => {
    for (const data of testData.positiveTests) {
      test(data.testName, async () => {
        // Perform login action using class method
        await loginPage.login(data.email, data.password, data.htmlElementEmail);

        // Perform page assertions using class methods
        await loginPage.verifyErrorMessage(data.expectedErrorMessage);
        await loginPage.verifyRedirectUrl(data.expectedUrlSubstring);
      });
    }
  });

  test.describe('Invalid Scenarios', () => {
    for (const data of testData.negativeTests) {
      test(data.testName, async () => {
        // Perform login action using class method
        await loginPage.login(data.email, data.password);

        // Assert error message using class method
        await loginPage.verifyErrorMessage(data.expectedErrorMessage);
      });
    }
  });

});