import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableRows = this.page.locator('table tbody tr');
    this.searchCustomerField = this.page.getByRole('textbox', { name: 'Search Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickCustomersButton() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }

  async expectLastCustomerFirstName(expectedName) {
    const firstNameCell = this.tableRows.last().locator('td').nth(0);
    await expect(firstNameCell).toHaveText(expectedName);
  }

  async expectLastCustomerLastName(expectedSurname) {
    const lastNameCell = this.tableRows.last().locator('td').nth(1);
    await expect(lastNameCell).toHaveText(expectedSurname);
  }

  async expectLastCustomerPostCode(expectedPostCode) {
    const postCodeCell = this.tableRows.last().locator('td').nth(2);
    await expect(postCodeCell).toHaveText(expectedPostCode);
  }

  async expectLastCustomerAccountNumberEmpty() {
    const accountCell = this.tableRows.last().locator('td').nth(3);
    await expect(accountCell).toBeEmpty();
  }

  async assertLastCustomerAccountNumberNotEmpty() {
    const accountCell = this.tableRows.last().locator('td').nth(3);
    await expect(accountCell).not.toBeEmpty();
  }

  async deleteCustomerByName(name) {
    const row = this.tableRows.filter({ hasText: name });
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerNotToExist(name) {
    const row = this.tableRows.filter({ hasText: name });
    await expect(row).not.toBeVisible();
  }

  async fillSearchCustomerField(Name) {
    await this.searchCustomerField.fill(Name);
  }

  async assertCustomerExists(value) {
    const row = this.tableRows.filter({ hasText: value });
    await expect(row).toBeVisible();
  }

  async assertOnlyOneRowVisible() {
    await expect(this.tableRows).toHaveCount(1);
  }
}
