/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require('@playwright/test');

exports.AllItemsPage = class AllItemsPage {
  constructor(page) {
    this.page = page;
    this.menuBar = page.locator('#react-burger-menu-btn');
    this.inventorySidebar = page.locator('#inventory_sidebar_link');
    this.allItems = page.locator('#inventory_sidebar_link');
    this.backPack = page.locator('#item_4_title_link');
    this.bikeLight = page.locator('#item_0_title_link');
    this.boltTShirt = page.locator('#item_1_title_link');
    this.fleeceJacket = page.locator('#item_5_title_link');
    this.onesie = page.locator('#item_2_title_link');
    this.tattRedTShirt = page.locator('#item_3_title_link');
  }

  async menuBarButonClick() {
    await this.menuBar.click();
    await expect(this.inventorySidebar).toBeVisible();
  }

  async allItemsButonClick() {
    await this.allItems.click();
    await expect(this.backPack).toBeVisible();
    await expect(this.bikeLight).toBeVisible();
    await expect(this.boltTShirt).toBeVisible();
    await expect(this.fleeceJacket).toBeVisible();
    await expect(this.onesie).toBeVisible();
    await expect(this.tattRedTShirt).toBeVisible();
  }
};
