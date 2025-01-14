const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Review Fellow interaction History', async ({ page }) => {
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

  // Click on gridcell 'Engineer Test'
  const gridCell = page.getByRole('gridcell', { name: 'Engineer Test' });
  await expect(gridCell).toBeVisible();
  await gridCell.click();
  console.log('Assertion passed: Engineer Test gridcell is visible and clicked.');

  // Click on 'Interactions'
  const interactionsLabel = page.getByLabel('Interactions');
  await expect(interactionsLabel).toBeVisible();
  await interactionsLabel.click();
  console.log('Assertion passed: Interactions label is visible and clicked.');

  // Click on 'Status' inside the fellow drawer
  const statusLabel = page.getByTestId('fellow-drawer').getByLabel('Status');
  await expect(statusLabel).toBeVisible();
  await statusLabel.click();
  console.log('Assertion passed: Status label inside fellow drawer is visible and clicked.');
});
