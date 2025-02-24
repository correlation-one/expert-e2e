const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Review learner interaction History', async ({ page }) => {
  console.log('Starting test');
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

  // Click on gridcell 'gabriel.deazevedo+2@correlation-one.com'
  const gridCell = page.getByRole('gridcell', { name: 'gabriel.deazevedo+2@correlation-one.com' });
  await expect(gridCell).toBeVisible();
  await gridCell.click();
  console.log('Assertion passed: gabriel.deazevedo+2@correlation-one.com gridcell is visible and clicked.');

  // Click on 'Interactions'
  const interactionsLabel = page.getByLabel('Interactions');
  await expect(interactionsLabel).toBeVisible();
  await interactionsLabel.click();
  console.log('Assertion passed: Interactions label is visible and clicked.');

  // Click on 'Status' inside the learner drawer
  const statusLabel = page.getByLabel('Status');
  await expect(statusLabel).toBeVisible();
  await statusLabel.click();
  console.log('Assertion passed: Status label inside learner drawer is visible and clicked.');
});
