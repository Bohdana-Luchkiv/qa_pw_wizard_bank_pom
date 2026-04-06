import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = this.page.getByRole('textbox', { name: 'First Name' });
    this.lastNameField = this.page.getByRole('textbox', { name: 'Last Name' });
    this.postCodeField = this.page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerButton = this.page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = this.page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstNameField(name) {
    await this.firstNameField.fill(name);
  }

  async fillLastNameField(surname) {
    await this.lastNameField.fill(surname);
  }

  async fillPostCodeField(number) {
    await this.postCodeField.fill(number);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
