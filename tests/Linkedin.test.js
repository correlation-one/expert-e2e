const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Fellow LinkedIn creation/update', async ({ page }) => {
  console.log('Starting test');

  // Function to generate a random string of characters
  function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Navigate to the website
  await page.goto('/');
  console.log('Navigated to homepage');

  // Check if the page title contains 'Sign in Correlation-one'
  await expect(page).toHaveTitle(/Sign in Correlation-one/);
  console.log('Title verified');

  // Perform login
  await login(page);
  await expect(page).toHaveTitle(/Expert Client/);
  const postLoginTitle = await page.title();
  console.log('Page title after login:', postLoginTitle);
  console.log('Login Successful');

  // Click on 'Add fellow update' button
  await page.getByRole('button', { name: 'Add fellow update' }).click();
  console.log('Clicked on Add fellow update button');

  // Search and select fellow
  await page.getByPlaceholder('Search fellow by name').click();
  await page.getByPlaceholder('Search fellow by name').fill('');
  await page.getByRole('option', { name: 'Engineer Test' }).click();
  console.log('Selected fellow: Engineer Test');

  // Click Next
  await page.getByRole('button', { name: 'Next' }).click();
  console.log('Proceeded to next step');

  // Generate a random LinkedIn link
  const randomLinkedInLink = `https://www.linkedin.com/in/${generateRandomString(8)}-test-${generateRandomString(8)}/`;

  // Fill the textbox with the generated LinkedIn link
  const textbox = page.getByRole('textbox');
  await textbox.fill(randomLinkedInLink);
  console.log('Filled textbox with generated LinkedIn link:', randomLinkedInLink);

  // Assertion to check that the correct link was filled
  await expect(textbox).toHaveValue(randomLinkedInLink);
  console.log('Assertion passed: The correct link was filled in the textbox.');

  // Click Save
  await page.getByRole('button', { name: 'Save' }).click();
  console.log('Clicked Save button');
});
