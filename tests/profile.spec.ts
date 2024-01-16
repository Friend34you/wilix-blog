import type {Page} from '@playwright/test';
import {test, expect} from '@playwright/test';
import {loadEnv} from "vite";

let page: Page;

test.beforeAll("auth", async ({browser}) => {
  const env = {...loadEnv("", "./")};

  page = await browser.newPage();

  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', {name: 'SignIn'}).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill(env.VITE_TEST_LOGIN!);
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill(env.VITE_TEST_PASSWORD!);

  await page.route("*/**/api/users/login", async (route) => {
    route;
    const json = {
      "user": {
        "username": "playwrightTest",
        "email": "play@test.com",
        "token": "token"
      }
    };

    await route.fulfill({json});
  });

  await page.getByLabel('Password').press('Enter');

  await expect(page.getByRole('link', {name: 'user playwrightTest'})).toBeVisible();
});

test('check is clicked profile correct', async () => {
  await page.locator('div').filter({hasText: /^blakuto11\.0\.20242$/}).locator('div').nth(1).click();
  await expect(page.getByText("blakuto")).toBeVisible();
});

test('create post (success)', async () => {
  await page.getByRole('link', {name: 'New Article'}).click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Playwright test title');
  await page.getByLabel('Title').press('Tab');
  await page.getByLabel('Description').fill('description about new post');
  await page.getByLabel('Description').press('Tab');
  await page.getByLabel('Body').fill('body body body body body body body body body body body body body');
  await page.getByPlaceholder('type tag name and press Enter').click();
  await page.getByPlaceholder('type tag name and press Enter').fill('wilix');
  await page.getByPlaceholder('type tag name and press Enter').press('Enter');
  await page.getByPlaceholder('type tag name and press Enter').fill('playwright');
  await page.getByPlaceholder('type tag name and press Enter').press('Enter');
  await page.getByPlaceholder('type tag name and press Enter').press('Tab');

  await page.route("*/**/api/articles/", (route) => {
    const json = {
      "article": {}
    };
    route.fulfill({json});
  });

  await page.getByRole('button', {name: 'Create Article'}).press('Enter');

  await expect(page.locator('.ant-notification-notice')).toBeVisible();
  await expect(page.getByText('Article successfully created')).toBeVisible();
});

test.afterAll(async () => {
  await page.close();
});

