const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Access to the list of learners associated to my programs', async ({ page }) => {
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
  await page.getByRole('tab', { name: 'Grading Service Test program' }).click();
  console.log('Navigated to Grading Service Test programm tab');  

  await page.getByPlaceholder('Search learner').click();
  await page.getByPlaceholder('Search learner').fill(learner);
  console.log(`Entered search term: ${learner}`);
  await page.getByRole('button', { name: learner }).click();
  console.log(`Clicked on ${learner}`);   
  
  const nameElement = page.locator('h4.MuiTypography-root.MuiTypography-h4');
  await expect(nameElement).toBeVisible();
  await expect(nameElement).toHaveText(learner);
  console.log(`Verified ${learner}\'s name is displayed correctly`);

  await page.getByLabel('Close').click();
  await page.getByPlaceholder('Search learner').click();
  await page.getByPlaceholder('Search learner').fill('Michael Scitt');
  const noRowsElement = page.getByRole('grid').getByText('No rows');
  await expect(noRowsElement).toBeVisible();

  const gridRows = page.getByRole('grid').locator('div[role="row"]').filter({ hasNotText: 'No rows' });
  await expect(gridRows).toHaveCount(1);
  console.log('Verified misspelled names DO NOT show up')

  await page.getByPlaceholder('Search learner').click();
  await page.getByPlaceholder('Search learner').fill(learner);

  await page.getByLabel('Group by None').click();
  // Wait for the grouping to take effect
  await page.getByText('Group by Engagement status').click();
  // Verify that "MIchael Scott" is present in the "On track" group
  const onRiskGroup = page.locator('div[aria-labelledby="at-risk-(1)-header"]');
  await expect(onRiskGroup.getByText(learner)).toBeVisible();
  console.log('Filter Group by Engagement status works as expected')
  
  await page.getByText('Group by Engagement status').click();
  await page.getByText('Group by Job search status').click();

  // Verify that "MIchael Scott" is present in the "interviewing" group
  const interviewingGroup = page.locator('div[aria-labelledby="interviewing-(1)-header"]');
  await expect(interviewingGroup.getByText(learner)).toBeVisible();
  console.log('Filter Group by Job search status works as expected');
});