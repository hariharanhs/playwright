import { test, expect } from '@playwright/test';
import testData from './partner_data.json';
import path from 'path';

test.describe('Partner Management Module', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate directly to the Partner Management page (authenticated via storageState)
    await page.goto('https://staging.enminvithaigal.in/greendeli/restaurant');
    await expect(page).toHaveURL('https://staging.enminvithaigal.in/greendeli/restaurant');
  });

  test('Add partner positive flow', async ({ page }) => {

    test.setTimeout(400000);

    await page.getByRole('button', { name: 'Add New' }).click();
    await expect(page.getByText('Add New Partner')).toBeVisible();

    await page.getByPlaceholder('Enter restaurant name').fill(testData.positiveTests[0].restaurantName);
    await page.getByPlaceholder('Enter mobile number').fill(testData.positiveTests[0].mobile);
    await page.getByPlaceholder('Enter email address').fill(testData.positiveTests[0].email);
    await page.getByPlaceholder('Enter password').fill(testData.positiveTests[0].password);
    await page.getByPlaceholder('Enter Deal percentage').fill(testData.positiveTests[0].dealPercentage);
    await page.getByPlaceholder('Enter FSSAI number').fill(testData.positiveTests[0].fssai);
    await page.getByPlaceholder('Enter GSTIN number').fill(testData.positiveTests[0].gstin);
    await page.locator('select[name="IsRestaurantAvailable"]').selectOption({ label: testData.positiveTests[0].availability });
    await page.locator('input[name="OpeningTime"]').fill(testData.positiveTests[0].openingTime);
    await page.locator('input[name="ClosingTime"]').fill(testData.positiveTests[0].closingTime);
    
    const image = path.resolve(__dirname, testData.positiveTests[0].imagePath);
    await page.locator('input[type="file"]').setInputFiles(image);

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.positiveTests[0].expectedMessage)).toBeVisible({ timeout: 400000 });
  });

  test('Add partner Negative flow (Empty validation)', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New' }).click();
    await expect(page.getByText('Add New Partner')).toBeVisible();
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText(testData.errors.restaurantName)).toBeVisible();
    await expect(page.getByText(testData.errors.email)).toBeVisible();
    await expect(page.getByText(testData.errors.isRestaurantAvailable)).toBeVisible();
    await expect(page.getByText(testData.errors.fssaiNumber)).toBeVisible();
    await expect(page.getByText(testData.errors.openingTime)).toBeVisible();
    await expect(page.getByText(testData.errors.mobileNumber)).toBeVisible();
    await expect(page.getByText(testData.errors.password)).toBeVisible();
    await expect(page.getByText(testData.errors.restaurantImage)).toBeVisible();
    await expect(page.getByText(testData.errors.dealPercentage)).toBeVisible();
    await expect(page.getByText(testData.errors.gstinNumber)).toBeVisible();
    await expect(page.getByText(testData.errors.closingTime)).toBeVisible();
  });

  test('Add partner Negative flow (invalid input)', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New' }).click();
    await expect(page.getByText('Add New Partner')).toBeVisible();

    // Name validations
    await page.getByPlaceholder('Enter restaurant name').fill(testData.invalidInputs.restaurantName.spaces);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.restaurantName.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter restaurant name').fill(testData.invalidInputs.restaurantName.specialChars);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.restaurantName.expectedError)).toBeVisible();

    // Mobile validations
    await page.getByPlaceholder('Enter mobile number').fill(testData.invalidInputs.mobileNumber.spaces);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.mobileNumber.numbersOnlyError)).toBeVisible();

    await page.getByPlaceholder('Enter mobile number').fill(testData.invalidInputs.mobileNumber.short);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.mobileNumber.exactDigitsError)).toBeVisible();

    await page.getByPlaceholder('Enter mobile number').fill(testData.invalidInputs.mobileNumber.long);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.mobileNumber.exactDigitsError)).toBeVisible();

    // Email validations
    await page.getByPlaceholder('Enter email address').fill(testData.invalidInputs.email.missingDomain);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.email.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter email address').fill(testData.invalidInputs.email.missingUser);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.email.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter email address').fill(testData.invalidInputs.email.spaces);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.email.expectedError)).toBeVisible();

    // Password validations
    await page.getByPlaceholder('Enter password').fill(testData.invalidInputs.password.spaces);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.password.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter password').fill(testData.invalidInputs.password.short);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.password.expectedError)).toBeVisible();

    // Deal Percentage validations
    await page.getByPlaceholder('Enter Deal percentage').fill(testData.invalidInputs.dealPercentage.spaces);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.dealPercentage.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter Deal percentage').fill(testData.invalidInputs.dealPercentage.negative);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.dealPercentage.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter Deal percentage').fill(testData.invalidInputs.dealPercentage.invalidChars);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.dealPercentage.expectedError)).toBeVisible();

    // FSSAI validations
    await page.getByPlaceholder('Enter FSSAI number').fill(testData.invalidInputs.fssaiNumber.spaces);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.fssaiNumber.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter FSSAI number').fill(testData.invalidInputs.fssaiNumber.invalidFormat);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.fssaiNumber.expectedError)).toBeVisible();

    // GSTIN validations
    await page.getByPlaceholder('Enter GSTIN number').fill(testData.invalidInputs.gstinNumber.spaces);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.gstinNumber.expectedError)).toBeVisible();

    await page.getByPlaceholder('Enter GSTIN number').fill(testData.invalidInputs.gstinNumber.invalidFormat);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.invalidInputs.gstinNumber.expectedError)).toBeVisible();
  });

  test('Edit partner positive flow', async ({ page }) => {
    await page.locator('tr').filter({ hasText: testData.editPartner.searchTarget }).locator('button:has(svg.lucide-eye), svg.lucide-eye').first().click();
    await expect(page.getByText('View partner or restaurant details.')).toBeVisible();

    await page.getByRole('button', { name: 'Edit' }).click();
    await page.locator('input[name="RestaurantName"]').fill(testData.editPartner.updatedName);
    await page.locator('input[name="MobileNumber"]').fill(testData.editPartner.updatedMobile);
    await page.locator('input[name="Email"]').fill(testData.editPartner.updatedEmail);
    await page.locator('input[name="Percentage"]').fill(testData.editPartner.updatedPercentage);
    await page.locator('input[name="FSSAI"]').fill(testData.editPartner.updatedFSSAI);
    await page.locator('input[name="GSTIN"]').fill(testData.editPartner.updatedGSTIN);

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.editPartner.expectedSuccessMessage)).toBeVisible();
  });

  test('Already existing details', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New' }).click();
    await expect(page.getByText('Add New Partner')).toBeVisible();

    // Initial form fill using JSON data
    await page.getByPlaceholder('Enter restaurant name').fill(testData.existingPartnerDuplicateCheck.initial.restaurantName);
    await page.getByPlaceholder('Enter mobile number').fill(testData.existingPartnerDuplicateCheck.initial.mobile);
    await page.getByPlaceholder('Enter email address').fill(testData.existingPartnerDuplicateCheck.initial.email);
    await page.getByPlaceholder('Enter password').fill(testData.existingPartnerDuplicateCheck.initial.password);
    await page.getByPlaceholder('Enter Deal percentage').fill(testData.existingPartnerDuplicateCheck.initial.dealPercentage);
    await page.getByPlaceholder('Enter FSSAI number').fill(testData.existingPartnerDuplicateCheck.initial.fssai);
    await page.getByPlaceholder('Enter GSTIN number').fill(testData.existingPartnerDuplicateCheck.initial.gstin);
    await page.locator('select[name="IsRestaurantAvailable"]').selectOption({ label: testData.existingPartnerDuplicateCheck.initial.availability });
    await page.locator('input[name="OpeningTime"]').fill(testData.existingPartnerDuplicateCheck.initial.openingTime);
    await page.locator('input[name="ClosingTime"]').fill(testData.existingPartnerDuplicateCheck.initial.closingTime);
    
    const image = path.resolve(__dirname, testData.existingPartnerDuplicateCheck.initial.imagePath);
    await page.locator('input[type="file"]').setInputFiles(image);

    // 1. Verify Duplicate FSSAI/GSTIN check
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.existingPartnerDuplicateCheck.fssaiGstinStep.expectedError)).toBeVisible();
    await page.getByPlaceholder('Enter FSSAI number').fill(testData.existingPartnerDuplicateCheck.fssaiGstinStep.newFssai);
    await page.getByPlaceholder('Enter GSTIN number').fill(testData.existingPartnerDuplicateCheck.fssaiGstinStep.newGstin);

    // 2. Verify Duplicate Restaurant Name check
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.existingPartnerDuplicateCheck.restaurantNameStep.expectedError)).toBeVisible();
    await page.getByPlaceholder('Enter restaurant name').fill(testData.existingPartnerDuplicateCheck.restaurantNameStep.newName);

    // 3. Verify Duplicate Email/Mobile check
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.existingPartnerDuplicateCheck.emailMobileStep.expectedError)).toBeVisible();
    await page.getByPlaceholder('Enter email address').fill(testData.existingPartnerDuplicateCheck.emailMobileStep.newEmail);
    await page.getByPlaceholder('Enter mobile number').fill(testData.existingPartnerDuplicateCheck.emailMobileStep.newMobile);

    // Final successful submission
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(testData.existingPartnerDuplicateCheck.expectedFinalMessage)).toBeVisible();
  });

  test('Cancel button check', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New' }).click();
    await expect(page.getByText('Add New Partner')).toBeVisible();

    await page.getByPlaceholder('Enter restaurant name').fill(testData.positiveTests[0].restaurantName);
    await page.getByPlaceholder('Enter mobile number').fill(testData.positiveTests[0].mobile);
    await page.getByPlaceholder('Enter email address').fill(testData.positiveTests[0].email);
    await page.getByPlaceholder('Enter password').fill(testData.positiveTests[0].password);
    await page.getByPlaceholder('Enter Deal percentage').fill(testData.positiveTests[0].dealPercentage);
    await page.getByPlaceholder('Enter FSSAI number').fill(testData.positiveTests[0].fssai);
    await page.getByPlaceholder('Enter GSTIN number').fill(testData.positiveTests[0].gstin);
    await page.locator('select[name="IsRestaurantAvailable"]').selectOption({ label: testData.positiveTests[0].availability });
    await page.locator('input[name="OpeningTime"]').fill(testData.positiveTests[0].openingTime);
    await page.locator('input[name="ClosingTime"]').fill(testData.positiveTests[0].closingTime);
    
    const image = path.resolve(__dirname, testData.positiveTests[0].imagePath);
    await page.locator('input[type="file"]').setInputFiles(image);

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Add New Partner')).not.toBeVisible();
  });

  test('Click cancel button in Delete partner', async ({ page }) => {
    await page.locator('tr').filter({ hasText: testData.deletePartner.targetPartner }).locator('button:has(svg.lucide-eye), svg.lucide-eye').first().click();
    await page.locator('svg.lucide-trash2').click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByText('View partner or restaurant details.')).toBeVisible();
  });

  test('Delete partner', async ({ page }) => {
    await page.locator('tr').filter({ hasText: testData.deletePartner.targetPartner }).locator('button:has(svg.lucide-eye), svg.lucide-eye').first().click();
    await page.locator('svg.lucide-trash2').click();
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText(testData.deletePartner.expectedSuccessMessage)).toBeVisible();
  });

});