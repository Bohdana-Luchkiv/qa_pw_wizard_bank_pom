import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = this.page.getByTestId('userSelect');
    this.currencyDropDown = this.page.getByTestId('currency');
    this.openAccountButton = this.page.getByRole('button', { name: 'Open Account' });
    this.processButton = this.page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async clickOpenAccount() {
    await this.openAccountButton.click();
  }

  async selectCustomer(name) {
    await this.customerDropDown.waitFor({ state: 'visible' });
    await this.customerDropDown.selectOption({ label: name });
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async assertCurrencyValue(expectedCurrency) {
    await expect(this.currencyDropDown).toHaveValue(expectedCurrency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
