/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require('@playwright/test');

exports.LeftMenuBar = class LeftMenuBar {
  constructor(page) {
    this.page = page;
    this.menuBar = page.locator('#react-burger-menu-btn');
    this.inventorySidebar = page.locator('#inventory_sidebar_link');
  }

  async menuBarButonClick() {
    await this.menuBar.click();
    await expect(this.inventorySidebar).toBeVisible();
  }
};
