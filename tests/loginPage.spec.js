/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

import { test, expect } from '@playwright/test';

const { USER_NAME, PASSWORD } = require('../variables');
const { LoginPage } = require('../POM/LoginPagePOM');
const { LeftMenuBar } = require('../POM/LeftMenuBarPOM');

test('000 Verify presence of Username and Password fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await expect(loginPage.username).toBeEmpty();
  await expect(loginPage.password).toBeEmpty();
  await expect(loginPage.loginButton).toHaveAttribute('type', 'submit');
});

test('001 Authorization with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.fillUsername('standard_user');
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLoginButton();
  await expect(page.getByText('Products')).toBeVisible();
});

test('002 Authorization with invalid username and valid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.fillUsername('invalid_username');
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLoginButton();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('003 Authorization with valid username and invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.fillUsername('standard_user');
  await loginPage.fillPassword('invalid_password');
  await loginPage.clickLoginButton();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('004 Authorization with invalid username and invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.fillUsername('invalid_user');
  await loginPage.fillPassword('invalid_password');
  await loginPage.clickLoginButton();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('005 Authorization with empty username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLoginButton();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('006 Authorization with empty password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.fillUsername('ahahahssaasfdssdsdfg');
  await loginPage.clickLoginButton();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('007 Authorization with an empty username and password.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.clickLoginButton();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('008 Ensure that the login is not possible with logged out user.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leftMenuBar = new LeftMenuBar(page);
  await loginPage.open();
  await loginPage.username.fill(USER_NAME);
  await loginPage.password.fill(PASSWORD);
  await loginPage.clickLoginButton();
  await expect(page.getByText('Products')).toBeVisible();
  await leftMenuBar.menuBarButonClick();
  await page.locator('#logout_sidebar_link').click();
  await expect(page).toHaveURL('/');
  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

// test('009 Ensure that login is possible with the Enter button.', async ({ page }) =>

test('010 Authorization with username case sensitivity', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user'.toUpperCase());
  await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('011 Authorization with Password case sensitivity', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce'.toUpperCase());
  await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('012 Verify characters limitation on username input field.', async ({ page }) => {
  const initialText = 'aaaaaaaaaaaaaaaaaaaaa';
  await page.goto('/');
  await page.locator('#user-name').fill(initialText);
  const getText = await page.locator('#user-name').getAttribute('value');
  if (initialText === getText) {
    test.fail();
  } else {
    console.log('pass');
  }
});

test('013 Verify characters limitation on paassword input field.', async ({ page }) => {
  const initialTextPassword = 'bbbbbbbbbbbbbbbbbbbbb';
  await page.goto('/');
  await page.locator('#password').fill(initialTextPassword);
  const getTextPassword = await page.locator('#password').getAttribute('value');
  if (initialTextPassword === getTextPassword) {
    test.fail();
  } else {
    console.log('pass');
  }
});

test('014 Verify that typed password characters are visible as asterisk symbols.', async ({ page }) => {
  await page.goto('/');
  if (await page.locator('#password').fill('secret_sauce')) {
    test.fail();
  }
});
test('015 Verify that the password field is not visible.', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#password')).toHaveAttribute('type', 'password');
});

test('016 Verify that the password field is not visible.', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#password')).toHaveAttribute('type', 'password');
});
