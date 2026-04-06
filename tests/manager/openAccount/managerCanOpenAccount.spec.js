import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let customerPage;
let openAccountPage;
let customersListPage;
let customerName;
let customerLastName;


test.beforeEach(async ({ page }) => {
  customerPage = new AddCustomerPage(page);
  openAccountPage = new OpenAccountPage(page);
  customersListPage = new CustomersListPage(page);

  customerName = faker.person.firstName();
  customerLastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await customerPage.open();
  await customerPage.fillFirstNameField(customerName);
  await customerPage.fillLastNameField(customerLastName);
  await customerPage.fillPostCodeField(postCode);
  await customerPage.clickAddCustomerButton();
  await page.reload();
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can open account', async ({ page }) => {
  await openAccountPage.open();
  await openAccountPage.selectCustomer(`${customerName} ${customerLastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
  await customersListPage.clickCustomersButton();
  await customersListPage.assertLastCustomerAccountNumberNotEmpty();
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
});
