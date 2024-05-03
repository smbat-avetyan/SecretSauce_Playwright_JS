/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

import { test, expect } from '@playwright/test';
import { AllItemsPage } from '../POM/AllItemsPOM';
import { LeftMenuBar } from '../POM/LeftMenuBarPOM';
import { LoginPage } from '../POM/LoginPagePOM';
import { GlobalPOM } from '../POM/GlobalPOM';

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test('Verify that the photo of product is visible ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const allItemsPage = new AllItemsPage(page);
  const globalPOM = new GlobalPOM(page);
  await loginPage.open();
  await loginPage.fillUsername(USER_NAME);
  await loginPage.fillPassword(PASSWORD);
  await loginPage.clickLoginButton();
  await globalPOM.checkurl('/inventory.html');
  await expect(page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')).toHaveAttribute('alt', 'Sauce Labs Backpack');
});
