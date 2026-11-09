const { test, expect } = require('@playwright/test');
const { captureRuntimeErrors, assertNoRuntimeErrors, assertLocalAssetsAndLinks, assertResponsive } = require('./helpers');

test('home navigation and local assets load without broken internal links', async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto('/');
  await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
  await page.getByRole('link', { name: 'Services & Analytics' }).click();
  await expect(page).toHaveURL(/services\.html$/);
  await expect(page.locator('main')).toBeVisible();
  await assertLocalAssetsAndLinks(page);
  await assertNoRuntimeErrors(errors);
});

test('language toggle updates the home headline and document language', async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto('/');
  const headline = page.locator('.hero-copy h1');
  await expect(headline).toContainText('Environmental expertise');
  await page.locator('#lang').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(headline).toContainText('Experiencia ambiental');
  await page.locator('#lang').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(headline).toContainText('Environmental expertise');
  await assertNoRuntimeErrors(errors);
});

test('country and theme controls filter the home project cards', async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto('/');
  const cards = page.locator('#project-grid .card');
  await expect(cards).toHaveCount(11);
  await page.locator('#country-filter').selectOption('Colombia');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Colombia');
  await page.locator('#country-filter').selectOption('all');
  await page.locator('#theme-filter').selectOption('Energy');
  await expect(cards).toHaveCount(1);
  await assertNoRuntimeErrors(errors);
});

test('home page fits a mobile viewport', async ({ page }) => {
  await assertResponsive(page, '/');
  await expect(page.locator('.hero-copy h1')).toBeVisible();
});
