import { expect, test } from '@playwright/test';

test('updates the greeting and restores the default when cleared', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Svelte template' })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText('Hello, world!');

    await page.getByLabel('Your name').fill('  Ada  ');
    await expect(page.getByRole('status')).toHaveText('Hello, Ada!');

    await page.getByLabel('Your name').fill('<script>alert(1)</script>');
    await expect(page.getByRole('status')).toHaveText('Hello, <script>alert(1)</script>!');

    await page.getByLabel('Your name').clear();
    await expect(page.getByRole('status')).toHaveText('Hello, world!');
});
