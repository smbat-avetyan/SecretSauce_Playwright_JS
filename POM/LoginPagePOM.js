/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async fillUsername(username) {
    await this.username.fill(username);
    await expect(this.username).toHaveValue(username);
  }

  async fillPassword(password) {
    await this.password.fill(password);
    await expect(this.password).toHaveValue(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async open() {
    await this.page.goto('/');
  }
};
