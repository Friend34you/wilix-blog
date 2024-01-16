import {test, expect} from '@playwright/test';

test('try to load 1 article (with fake req)', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await page.route("*/**/api/articles/sereznyj-post-s-bolshim-zagolo-sy6p39", async (route) => {
    const json = {
      "article": {
        "slug": "sereznyj-post-s-bolshim-zagolo-sy6p39",
        "title": "Серезный пост с большим заголо",
        "description": "Какое-то описание максимальной длины",
        "body": "Замокад",
        "createdAt": "2024-01-11T10:10:54.059Z",
        "updatedAt": "2024-01-12T09:28:33.523Z",
        "tagList": [
          "тег",
          "тег2",
          "тег3",
          "тег4",
          "тег5",
          "тег6",
          "тег7"
        ],
        "favorited": false,
        "favoritesCount": 1,
        "author": {
          "username": "blakuto",
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        }
      }
    };
    await route.fulfill({json});
  });

  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'}).click();
  await expect(page.getByRole('heading', {name: 'Серезный пост с большим заголо'})).toBeVisible();
});

test('feed tag clicked', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
  await expect(page.getByText('12anotherOnebig')).toBeVisible();
  await page.getByText('wilix').nth(1).click();
  await expect(page.locator('.sc-kfzCjt > span')).toBeVisible();
});