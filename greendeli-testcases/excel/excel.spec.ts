import { test } from '@playwright/test';
import { getAllExcelData, getRowByText } from './excelUtils';
import path from 'path';

test('Read Excel and retrieve specific row for validation', async ({ page }) => {
  const excelFilePath = path.join(__dirname, '資料11_建物定期点検チェック表(雛形).xlsx');

  // 1. CALLING METHOD 1: Get all contents as 2D Array
  const allRows = getAllExcelData(excelFilePath);
  console.log('--- Total Rows Fetched ---:', allRows.length);

  // 2. CALLING METHOD 2: Get particular row by search text
  const targetText = '1.1.1';
  const matchedRow = getRowByText(excelFilePath, targetText);

  console.log(`--- Matched Row for "${targetText}" ---:`, matchedRow);

  // You can now perform your custom validations on 'matchedRow' before using Playwright assertions
  if (matchedRow) {
    const itemNumber = matchedRow[0];     // '1.1.1'
    const description = matchedRow[1];    // '漏水の有無'
    const method = matchedRow[2];         // 'ﾋｱﾘﾝｸﾞ'

    // Your custom logic / validation here:
    // ...
  }
});