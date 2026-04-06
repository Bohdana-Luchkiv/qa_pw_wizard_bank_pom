import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let customerPage;
let customersListPage;
let customerName;

test.beforeEach(async ({ page }) => {
  customerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);

  customerName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await customerPage.open();
  await customerPage.fillFirstNameField(customerName);
  await customerPage.fillLastNameField(lastName);
  await customerPage.fillPostCodeField(postCode);
  await customerPage.clickAddCustomerButton();
  await page.reload();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  
  await customersListPage.open();
  await customersListPage.deleteCustomerByName(customerName);
  await customersListPage.assertCustomerNotToExist(customerName);
  await page.reload();
  await customersListPage.assertCustomerNotToExist(customerName);

  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
