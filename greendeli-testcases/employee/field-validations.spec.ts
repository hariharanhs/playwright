import { test, expect } from '@playwright/test';
import testData from './best-practise-full-submission.json';

test.describe('Employee Form - Field Level Validations', () => {

  // ⚡ ENABLES PARALLEL EXECUTION FOR ALL GENERATED TESTS IN THIS FILE
  test.describe.configure({ mode: 'parallel' });

  // 1. Email Textbox Validation Loop
  test.describe('Email Field Validation Rules', () => {
    for (const tc of testData.emailRules) {
      test(`${tc.testId} - [${tc.rule}]: Email "${tc.inputValue}"`, async ({ page }) => {
        await page.goto('http://106.51.127.87:3030/intraHubNew/#/createEmployee');

        const emailInput = page.getByPlaceholder('Employee official email');
        await emailInput.fill(tc.inputValue);
        await emailInput.blur(); // Trigger field-level validation on unfocus

        if (tc.expectedError !== null) {
          // Negative Flow Assertion
          await expect(page.getByText(tc.expectedError)).toBeVisible();
        } else {
          // Positive Flow Assertion
          await expect(page.getByText('Please enter a valid email address')).not.toBeVisible();
          await expect(page.getByText('Email is required')).not.toBeVisible();
        }
      });
    }
  });

  // 2. Password Textbox Validation Loop
  test.describe('Password Field Validation Rules', () => {
    for (const tc of testData.passwordRules) {
      test(`${tc.testId} - [${tc.rule}]: Password "${tc.inputValue}"`, async ({ page }) => {
        await page.goto('http://106.51.127.87:3030/intraHubNew/#/createEmployee');

        const passwordInput = page.getByPlaceholder('Password');
        await passwordInput.fill(tc.inputValue);
        await passwordInput.blur();

        if (tc.expectedError !== null) {
          // Negative Flow Assertion
          await expect(page.getByText(tc.expectedError)).toBeVisible();
        } else {
          // Positive Flow Assertion
          await expect(passwordInput).toHaveValue(tc.inputValue);
        }
      });
    }
  });

});