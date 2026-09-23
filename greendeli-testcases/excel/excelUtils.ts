import * as XLSX from 'xlsx';

/**
 * METHOD 1: Gets all rows from the specified Excel sheet as a 2D Array
 * @param filePath - Path to your .xlsx file
 * @param sheetName - (Optional) Name of the sheet. Defaults to the first sheet.
 * @returns 2D Array containing all row values
 */
export function getAllExcelData(filePath: string, sheetName?: string): any[][] {
  const workbook = XLSX.readFile(filePath);
  const targetSheetName = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheetName];

  // Reads as raw 2D matrix array: [[row1_cell1, row1_cell2], [row2_cell1, ...]]
  const allData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return allData;
}

/**
 * METHOD 2: Searches for a text/code and returns THAT PARTICULAR ROW as an array
 * @param filePath - Path to your .xlsx file
 * @param searchText - The text/code to search (e.g., '1.1.1' or '漏水の有無')
 * @param sheetName - (Optional) Name of the sheet. Defaults to the first sheet.
 * @returns Array representing the entire matching row, or null if not found
 */
export function getRowByText(filePath: string, searchText: string, sheetName?: string): any[] | null {
  const allData = getAllExcelData(filePath, sheetName);

  for (const row of allData) {
    const isFound = row.some(
      cellValue =>
        cellValue !== undefined &&
        cellValue !== null &&
        String(cellValue).includes(searchText)
    );

    if (isFound) {
      return row; // Returns the specific row array
    }
  }

  return null;
}