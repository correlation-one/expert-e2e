// utils/login.js
require('dotenv').config();

async function login(page) {

  await page.fill('input[id="username"]', process.env.EMAIL);
  console.log('Email field filled');

  await page.fill('input[id="password"]', process.env.PASSWORD);
  console.log('Password field filled');

  await page.click('button[type="submit"]');
  console.log('Submit button clicked');

  await page.waitForNavigation();
  console.log('Navigation completed');
}

module.exports = { login };