import { test, expect } from '@playwright/test';

test('000 Verify presence of Username and Password fields', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#user-name')).toBeEmpty();
  await expect(page.locator('#password')).toBeEmpty();
  await expect(page.locator('#login-button')).toHaveAttribute('type', 'submit');
});

test('001 Authorization with valid credentials', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.getByText('Products')).toBeVisible();
});

test('002 Authorization with invalid username and valid password', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('invalid_username');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('003 Authorization with valid username and invalid password', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('invalid_password');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('004 Authorization with invalid username and invalid password', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('invalid_user');
  await page.locator('#password').fill('invalid_password');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('005 Authorization with empty username', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#user-name')).toBeEmpty();
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('006 Authorization with empty password', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('sgshfhdxdmhjv,kbkjb,.ker');
  await expect(page.locator('#password')).toBeEmpty();
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('007 Authorization with an empty username and password.', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#user-name')).toBeEmpty();
  await expect(page.locator('#password')).toBeEmpty();
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
});

test('008 Ensure that the login is not possible with logged out user.', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.getByText('Products')).toBeVisible();
  await page.locator('#react-burger-menu-btn').click();
  await expect(page.locator('#inventory_sidebar_link')).toBeVisible();
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
