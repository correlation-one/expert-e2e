const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Creating Job Search status update', async ({ page }) => {
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

  // Click on 'Add learner update' button
  await page.getByRole('button', { name: 'Add learner update' }).click();
  console.log('Clicked on Add learner update button');

  // Search and select learner
  await page.getByPlaceholder('Search learner by name').click();
  await page.getByPlaceholder('Search learner by name').fill('');
  await page.getByRole('option', { name: 'gabriel.deazevedo+2@correlation-one.com' }).click();
  console.log('Selected learner: gabriel.deazevedo+2@correlation-one.com');

  await page.getByRole('button', { name: 'Next' }).click();
  console.log('Clicked Next button');

  await page.getByRole('link', { name: 'Job search status' }).click();
  console.log('Navigated to Job search status');

  // Add a wait to allow the status elements to appear
  await page.waitForTimeout(5000);

  // Locate the status text on the page
  const applyingStatus = page.locator('p:has-text("gabriel.deazevedo+2@correlation-one.com\'s current engagement status is Applying")');
  const notLookingStatus = page.locator('p:has-text("gabriel.deazevedo+2@correlation-one.com\'s current engagement status is Not looking")');

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

  const startNewUpdateButton = page.getByRole('button', { name: 'Start a new learner update' });
  await expect(startNewUpdateButton).toBeVisible();
  console.log('Verified "Start a new learner update" button is present');

  console.log('Test completed successfully');
});
