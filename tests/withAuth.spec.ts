import {test, expect} from '@playwright/test';
import {loadEnv} from "vite";
import {articlesFeed} from "./mock-data/articles_feed";
import {article} from "./mock-data/article";

test.beforeEach("auth", async ({page}) => {
  const env = {...loadEnv("", "./")};

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

test('check is clicked profile correct', async ({page}) => {
  await page.locator('.ant-flex > .ant-space > div').first().click();
  await expect(page.getByTestId("profile-username").getByText("blakuto")).toBeVisible();
});

test('create post (success)', async ({page}) => {
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

test("logout", async ({page}) => {
  await page.route("*/**/api/profiles/*", (route) => {
    route.fulfill({
      json: {
        "profile": {
          "username": "playwrightTest",
          "following": false
        }
      }
    });
  });

  await page.getByRole('link', {name: 'user playwrightTest'}).click();
  await page.getByRole('button', {name: 'LogOut'}).click();
  await expect(page.getByRole('link', {name: 'SignIn'})).toBeVisible();
});

test("favorite article (auth)", async ({page}) => {
  await page.route("*/**/api/articles?limit=10&offset=0", (route) => {
    route.fulfill({json: articlesFeed});
  });
  await page.route("*/**/api/articles/*/favorite", (route) => {
    route.fulfill({
      json: {
        "article": {
          "favorited": true,
          "favoritesCount": 2
        }
      }
    });
  });

  await page.getByRole('button', {name: 'star 1'}).first().click();
  await expect(page.getByRole('button', {name: '2'})).toBeVisible();
});

test('favorite on article page (auth)', async ({page}) => {

  await page.route("*/**/api/articles/*", async (route) => {
    await route.fulfill({json: article});
  });

  await page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'}).click();
  await expect(page.getByRole('heading', {name: 'Серезный пост с большим заголо'})).toBeVisible();

  await page.route("*/**/api/articles/*/favorite", (route) => {
    route.fulfill({
      json: {
        "article": {
          "favorited": true,
          "favoritesCount": 2
        }
      }
    });
  });

  await page.getByRole('button', {name: 'star favorite'}).click();
  await expect(page.getByRole('button', {name: 'check favorited'})).toBeVisible();
});

test('follow user on article page (auth)', async ({page}) => {

  await page.route("*/**/api/articles/sereznyj-post-s-bolshim-zagolo-sy6p39", async (route) => {
    await route.fulfill({json: article});
  });

  await page.route("*/**/api/profiles/blakuto", async (route) => {
    await route.fulfill({
      json: {
        profile: {
          username: "blakuto",
          following: false
        }
      }
    });
  });

  await page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'}).click();
  await expect(page.getByRole('heading', {name: 'Серезный пост с большим заголо'})).toBeVisible();

  await page.route("*/**/api/profiles/*/follow", async (route) => {
    await route.fulfill({
      json: {
        profile: {
          username: "blakuto",
          following: true
        }
      }
    });
  });

  await page.getByRole('button', {name: 'heart follow'}).click();
  await expect(page.getByRole('button', {name: 'check followed'})).toBeVisible();
});
