const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Creating Job Search status update', async ({ page }) => {
  const learner = 'gabriel.deazevedo+2@correlation-one.com'
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
  await page.getByRole('option', { name: learner }).click();
  console.log(`Selected learner: ${learner}`);

  await page.getByRole('button', { name: 'Next' }).click();
  console.log('Clicked Next button');

  await page.getByRole('link', { name: 'Job search status' }).click();
  console.log('Navigated to Job search status');


  // Locate the status text on the page
  const statusLocator = await page.locator(`//p[contains(text(), "${learner}")]/div/span`).textContent();

  // Click based on the current status
  const chipLabels = page.locator("span[class*='MuiChip-label'].css-9iedg7");

  if (statusLocator == "Applying") {
    // If the status is "Applying", click the fifth element
    await chipLabels.nth(4).click();
    console.log('Current status is "Applying". Clicked on Not looking.');
  } else if (statusLocator == "Not looking") {
    // If the status is "Not looking", click the third element
    await chipLabels.nth(2).click();
    console.log('Current status is "Not looking". Clicked on Applying.');
  } else if (statusLocator == "Preparation") {
    // If the status is "Preapration", click the third element
    await chipLabels.nth(2).click();
    console.log('Current status is "Preapration". Clicked on Applying.');
  }

  // Click Next button
  const nextButton = page.getByRole('button', { name: 'Next' });
  await nextButton.click();
  console.log('Clicked Next button');

  await page.locator('input[placeholder="Company names"]').fill('Test Company');
  await page.locator('input[placeholder="MM/DD/YYYY"]').fill('01/01/2022');

  await page.locator('//Button[text()="Submit"]').click();

  // // Add a wait for the success message to appear
  // await page.waitForSelector('h4.MuiTypography-root.MuiTypography-h4.css-1qi9c73', { state: 'visible', timeout: 10000 });
  // console.log('Success message appeared.');

  // Verify the presence of the success elements
  const successHeading = page.locator('h4.MuiTypography-root.MuiTypography-h4');
  await expect(successHeading).toBeVisible();
  console.log('Verified success heading is displayed');

  const successMessage = page.locator('p.MuiTypography-root.MuiTypography-body1').nth(2);
  await expect(successMessage).toBeVisible();
  console.log('Verified success message is displayed');

  // Verify the presence of the action buttons
  const addMoreUpdatesButton = page.getByRole('button', { name: `Add more updates to ${learner}` });
  await expect(addMoreUpdatesButton).toBeVisible();
  console.log('Verified "Add more updates" button is present');

  const startNewUpdateButton = page.getByRole('button', { name: 'Start a new learner update' });
  await expect(startNewUpdateButton).toBeVisible();
  console.log('Verified "Start a new learner update" button is present');

  console.log('Test completed successfully');
});
