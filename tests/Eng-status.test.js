const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Creating Engagement status update', async ({ page }) => {
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

  // Click Next
  await page.getByRole('button', { name: 'Next' }).click();
  console.log('Proceeded to next step');

    // Select Interaction type
    await page.getByRole('link', { name: 'Engagement status' }).click();
    console.log('Clicked on Engagement status');

    // Select the first radio button in the group
    const firstRadioButton = page.locator('input[type="radio"]').first();
    await firstRadioButton.check();

    // Get the label of the selected option
    const selectedLabel = await page.locator('input[type="radio"]:checked + svg').locator('xpath=../following-sibling::span//span').innerText();
    console.log(`Selected status: ${selectedLabel}`);

    // Verify that the radio button is checked
    await expect(firstRadioButton).toBeChecked();

    // Click Next button
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('Clicked Next button');

    // Fill in the text field
    const textField = page.getByPlaceholder('Max 100 characters');
    await textField.click();
    await textField.fill('Test');
    await expect(textField).toHaveValue('Test');
    console.log('Filled text field with "Test"');

    // Select 'No' option
    const noOption = page.locator('label').filter({ hasText: 'No' });
    await noOption.click();
    await expect(noOption).toBeChecked();
    console.log('Selected "No" option');

    // Submit the form
    await page.getByRole('button', { name: 'Submit' }).click();
    console.log('Clicked Submit button');

    // Verify the presence of the success element
    const successHeading = page.locator('h4.MuiTypography-root.MuiTypography-h4.css-1qi9c73');
    await expect(successHeading).toBeVisible();
    await expect(successHeading).toHaveText('Every challenge is an opportunity.');
    console.log('Verified success heading is displayed with correct text');

    // Verify the presence of the success message
    const successMessage = page.locator('p.MuiTypography-root.MuiTypography-body1.css-zeb3zs');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Maybe a follow-up could be the turning point. Remember, the best view comes after the hardest climb!');
    console.log('Verified success message is displayed with correct text');

    // Verify the presence of the action buttons
    const addMoreUpdatesButton = page.getByRole('button', { name: 'Add more updates to Engineer' });
    await expect(addMoreUpdatesButton).toBeVisible();
    console.log('Verified "Add more updates" button is present');

    const startNewUpdateButton = page.getByRole('button', { name: 'Start a new learner update' });
    await expect(startNewUpdateButton).toBeVisible();
    console.log('Verified "Start a new learner update" button is present');

    console.log('Test completed successfully');

});