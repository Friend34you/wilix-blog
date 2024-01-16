import {test, expect} from '@playwright/test';
import {article} from "./mock-data/article";
import {articlesFeed} from "./mock-data/articles_feed.ts";
import {loadEnv} from "vite";

test.beforeEach(async ({page}) =>{
  await page.goto('http://localhost:5173/');
});
test('load 1 article (with fake req)', async ({page}) => {

  await page.route("*/**/api/articles/sereznyj-post-s-bolshim-zagolo-sy6p39", async (route) => {
    await route.fulfill({json: article});
  });

  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'}).click();
  await expect(page.getByRole('heading', {name: 'Серезный пост с большим заголо'})).toBeVisible();
});

test('feed tag clicked', async ({page}) => {

  await page.route("*/**/api/tags", (route) => {
    const json = {
      tags: ["wilix", "tag1", "tag2", "tag3"]
    };

    route.fulfill({json});
  });

  await page.goto('http://localhost:5173/articles/');

  await expect(page.getByText('wilixtag1tag2tag3')).toBeVisible();
  await page.getByText('wilix').nth(1).click();
  await expect(page.getByText('wilix').nth(2)).toBeVisible();
  await page.getByLabel('close').locator('path').click();
  await expect(page.getByLabel('close').locator('path')).not.toBeVisible();
});

test('load articles', async ({page}) => {

  await page.route("*/**/api/articles?limit=10&offset=0", (route) => {
    route.fulfill({json: articlesFeed});
  });

  await page.goto('http://localhost:5173/articles/');

  await expect(page.getByRole('link', {name: 'BIG TEXT TO TEST decription'})).toBeVisible();
});

test("favorite article (unauth)", async ({page}) => {
  await page.route("*/**/api/articles?limit=10&offset=0", (route) => {
    route.fulfill({json: articlesFeed});
  });

  await page.goto('http://localhost:5173/articles/');

  await expect(page.getByRole('link', {name: 'BIG TEXT TO TEST decription'})).toBeVisible();

  await page.getByRole('button', {name: 'star 2'}).click();
  await expect(page.getByText("Authorization")).toBeVisible();
});

test('see user feed (unauth)', async ({page}) => {
  await page.getByText('Global articles feed').click();
  await page.getByText('Global articles feed').click();
  await expect(page.getByText('Global articles feed')).toBeVisible();
  await page.getByText('Your articles feed').click();
  await expect(page.getByRole('heading', {name: 'Authorization'})).toBeVisible();
});

test('see user feed (with auth)', async ({ page }) => {
  const env = {...loadEnv("", "./")};

  await page.getByRole('link', { name: 'SignIn' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill(env.VITE_TEST_LOGIN!);
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill(env.VITE_TEST_PASSWORD!);
  await page.getByLabel('Password').press('Enter');
  await page.getByText('Your articles feed').click();
  await expect(page.getByRole('link', { name: 'user blakuto' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();
});

test('favorite on article page (unauth)', async ({page}) => {

  await page.route("*/**/api/articles/sereznyj-post-s-bolshim-zagolo-sy6p39", async (route) => {
    await route.fulfill({json: article});
  });

  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'}).click();
  await expect(page.getByRole('heading', {name: 'Серезный пост с большим заголо'})).toBeVisible();

  await page.getByRole('button', { name: 'star favorite' }).click();
  await expect(page.getByText("Authorization")).toBeVisible();
});

test('follow user on article page (unauth)', async ({page}) => {

  await page.route("*/**/api/articles/sereznyj-post-s-bolshim-zagolo-sy6p39", async (route) => {
    await route.fulfill({json: article});
  });

  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'}).click();
  await expect(page.getByRole('heading', {name: 'Серезный пост с большим заголо'})).toBeVisible();

  await page.getByRole('button', { name: 'heart follow' }).click();
  await expect(page.getByText("Authorization")).toBeVisible();
});