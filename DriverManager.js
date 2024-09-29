require('dotenv').config();
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class DriverManager {
  constructor() {
    this.driver = null;
  }

  async startDriver() {
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options())
      .build();
    await this.driver.manage().window().maximize();
  }

  async getDriver() {
    return this.driver;
  }

  async closeDriver() {
    if (this.driver) {
      await this.driver.quit();
    }
  }
}

module.exports = DriverManager;
