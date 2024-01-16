import {test, expect} from '@playwright/test';
import {article} from "./mock-data/article";
import {articlesFeed} from "./mock-data/articles_feed.ts";

test('try to load 1 article (with fake req)', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await page.route("*/**/api/articles/sereznyj-post-s-bolshim-zagolo-sy6p39", async (route) => {
    await route.fulfill({json: article});
  });

  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'}).click();
  await expect(page.getByRole('heading', {name: 'Серезный пост с большим заголо'})).toBeVisible();
});

test('feed tag clicked', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await page.route("*/**/api/tags", (route) => {
    const json = {
      tags: ["wilix", "tag1", "tag2", "tag3"]
    };

    route.fulfill({json});
  });

  await page.goto('http://localhost:5173/articles/');

  await expect(page.getByText('wilixtag1tag2tag3')).toBeVisible();
  await page.getByText('wilix').nth(1).click();
  await expect(page.locator('.sc-kfzCjt > span')).toBeVisible();
  await page.getByLabel('close').locator('path').click();
  await expect(page.locator('.sc-kfzCjt > span')).not.toBeVisible();
});

test('load articles', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await page.route("*/**/api/articles?limit=10&offset=0", (route) => {
    route.fulfill({json: articlesFeed});
  });

  await page.goto('http://localhost:5173/articles/');

  await expect(page.getByRole('link', { name: 'BIG TEXT TO TEST decription' })).toBeVisible();
});

test("fvorite article (unauth)", async ({page}) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'star 2' }).click();
  await expect(page.getByText("Authorization")).toBeVisible();
});