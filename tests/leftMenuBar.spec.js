/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from '@playwright/test';

test('015 Verify the visibility of the Menu Button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#user-name')).toBeEmpty();
  await expect(page.locator('#password')).toBeEmpty();
  await expect(page.locator('#login-button')).toHaveAttribute('type', 'submit');
});
