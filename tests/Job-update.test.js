const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Engagement status', async ({ page }) => {
  console.log('Starting test: Add fellow update and interaction');

  // Navigate to the website
  await page.goto('/');
  console.log('Navigated to homepage');

  // Check if the page title contains 'Sign In with Auth0'
  await expect(page).toHaveTitle(/Sign In with Auth0/);
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

  await page.getByRole('button', { name: 'Next' }).click();
  console.log('Clicked Next button');

  await page.getByRole('link', { name: 'Job search status' }).click();
  console.log('Navigated to Job search status');

  // Add a wait to allow the status elements to appear
  await page.waitForTimeout(5000);

  // Locate the status text on the page
  const applyingStatus = page.locator('p:has-text("Engineer Test\'s current engagement status is Applying")');
  const notLookingStatus = page.locator('p:has-text("Engineer Test\'s current engagement status is Not looking")');

  // Click based on the current status
  const chipLabels = page.locator("span[class*='MuiChip-label'].css-9iedg7");

  if (await applyingStatus.isVisible()) {
    // If the status is "Applying", click the fifth element
    await chipLabels.nth(4).click();
    console.log('Current status is "Applying". Clicked on Not looking.');
  } else if (await notLookingStatus.isVisible()) {
    // If the status is "Not looking", click the third element
    await chipLabels.nth(2).click();
    console.log('Current status is "Not looking". Clicked on Applying.');
  }

  // Click Next button
  const nextButton = page.getByRole('button', { name: 'Next' });
  await nextButton.click();
  console.log('Clicked Next button');

  // Add a wait for the success message to appear
  await page.waitForSelector('h4.MuiTypography-root.MuiTypography-h4.css-1qi9c73', { state: 'visible', timeout: 10000 });
  console.log('Success message appeared.');

  // Verify the presence of the success elements
  const successHeading = page.locator('h4.MuiTypography-root.MuiTypography-h4.css-1qi9c73');
  await expect(successHeading).toBeVisible();
  console.log('Verified success heading is displayed');

  const successMessage = page.locator('p.MuiTypography-root.MuiTypography-body1.css-zeb3zs');
  await expect(successMessage).toBeVisible();
  console.log('Verified success message is displayed');

  // Verify the presence of the action buttons
  const addMoreUpdatesButton = page.getByRole('button', { name: 'Add more updates to Engineer' });
  await expect(addMoreUpdatesButton).toBeVisible();
  console.log('Verified "Add more updates" button is present');

  const startNewUpdateButton = page.getByRole('button', { name: 'Start a new fellow update' });
  await expect(startNewUpdateButton).toBeVisible();
  console.log('Verified "Start a new fellow update" button is present');

  console.log('Test completed successfully');
});