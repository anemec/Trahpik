import { test, expect } from '@playwright/test';

test.describe('Mobile Art Gallery', () => {
  test('home page loads correctly on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Art Gallery' })).toBeVisible();
    await expect(page.getByText('Explore our collection of generated art pieces')).toBeVisible();
  });

  test('displays art pieces in mobile grid layout', async ({ page }) => {
    await page.goto('/');
    const artCards = page.getByRole('link').filter({ has: page.getByText(/Geometric Waves|Color Gradient|Particle System/) });
    await expect(artCards.first()).toBeVisible();
  });

  test('can navigate to geometric waves art page on mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Geometric Waves/ }).click();
    await expect(page.getByRole('heading', { name: 'Geometric Waves' })).toBeVisible();
    await expect(page.getByText(/Back to Gallery/i)).toBeVisible();
  });

  test('can navigate to color gradient art page on mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Color Gradient/ }).click();
    await expect(page.getByRole('heading', { name: 'Color Gradient' })).toBeVisible();
  });

  test('can navigate to particle system art page on mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Particle System/ }).click();
    await expect(page.getByRole('heading', { name: 'Particle System' })).toBeVisible();
  });

  test('can navigate back to home from art page on mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Geometric Waves/ }).click();
    await page.getByRole('link', { name: /Back to Gallery/i }).click();
    await expect(page.getByRole('heading', { name: 'Art Gallery' })).toBeVisible();
  });

  test('art canvas renders on mobile viewport', async ({ page }) => {
    await page.goto('/art/geometric-waves');
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    const boundingBox = await canvas.boundingBox();
    expect(boundingBox.width).toBeGreaterThan(0);
    expect(boundingBox.height).toBeGreaterThan(0);
  });

  test('mobile touch interactions work', async ({ page }) => {
    await page.goto('/');
    const artCard = page.getByRole('link', { name: /Geometric Waves/ }).first();
    await artCard.tap();
    await expect(page.getByRole('heading', { name: 'Geometric Waves' })).toBeVisible();
  });
});
