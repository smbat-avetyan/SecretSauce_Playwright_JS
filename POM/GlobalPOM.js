/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require('@playwright/test');

exports.GlobalPOM = class GlobalPOM {
  constructor(page) {
    this.page = page;
  }

  async checkurl(url) {
    await expect(this.page).toHaveURL(url);
  }
};
