const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Add fellow update and interaction', async ({ page }) => {
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

  // Click Next
  await page.getByRole('button', { name: 'Next' }).click();
  console.log('Proceeded to next step');

  // Select Interaction type
  await page.getByRole('link', { name: ':1 Interaction' }).click();
  await expect(page.locator('label').filter({ hasText: 'Slack/Email' })).toBeVisible();
  await page.locator('label').filter({ hasText: 'Slack/Email' }).click();
  console.log('Selected interaction type: Slack/Email');

  // Proceed to next step
  await page.getByRole('button', { name: 'Next' }).click();
  console.log('Proceeded to interaction details');

  // Fill in interaction details
  await page.getByPlaceholder('Max 2000 characters').click();
  await page.getByPlaceholder('Max 2000 characters').fill('Test interaction details');
  console.log('Filled interaction details');

  // Select interaction topic
  await page.getByText('Introduction').click();
  console.log('Selected interaction topic: Introduction');

  // Select 'No' for follow-up
  await expect(page.locator('label').filter({ hasText: /^No$/ })).toBeVisible();
  await page.locator('label').filter({ hasText: /^No$/ }).click();
  console.log('Selected No for follow-up');

  // Submit the interaction
  await page.getByRole('button', { name: 'Submit' }).click();
  console.log('Submitted the interaction');
    // Verify the presence of the success element
    const successElement = page.locator('h4.MuiTypography-root.MuiTypography-h4.css-1qi9c73');
    await expect(successElement).toBeVisible();
    await expect(successElement).toHaveText('High-five, alan+2@correlation-one.com');
    console.log('Verified success element is displayed with correct text');

    // Verify the presence of the success message paragraph
    const successMessage = page.locator('p.MuiTypography-root.MuiTypography-body1.css-zeb3zs');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText("Another step closer to");
    console.log('Verified success message is displayed with correct text');

    // Optionally, verify the presence of the action buttons
    const addMoreUpdatesButton = page.getByRole('button', { name: 'Add more updates to Engineer' });
    await expect(addMoreUpdatesButton).toBeVisible();
    console.log('Verified "Add more updates" button is present');

    const startNewUpdateButton = page.getByRole('button', { name: 'Start a new fellow update' });
    await expect(startNewUpdateButton).toBeVisible();
    console.log('Verified "Start a new fellow update" button is present');

    console.log('Test completed successfully');
});