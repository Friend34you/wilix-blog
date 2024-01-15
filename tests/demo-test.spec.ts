import {test, expect} from '@playwright/test';
import {loadEnv} from "vite";

test('try to see user feed unauthorized', async ({page}) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
  await page.getByText('Global articles feed').click();
  await page.getByText('Global articles feed').click();
  await expect(page.getByText('Global articles feed')).toBeVisible();
  await page.getByText('Your articles feed').click();
  await expect(page.getByRole('heading', {name: 'Authorization'})).toBeVisible();
});

test('try to signIn', async ({page}) => {
  const env = {...loadEnv("", "./")};

  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', {name: 'SignIn'}).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill(env.VITE_TEST_LOGIN!);
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill(env.VITE_TEST_PASSWORD!);
  await page.getByLabel('Password').press('Enter');
  await expect(page.getByRole('link', {name: 'user blakuto'})).toBeVisible();
});

test('try to load 1 article (with fake req)', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await page.route("http://localhost:3000/api/articles/sereznyj-post-s-bolshim-zagolo-sy6p39", async (route) => {
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

test('try to reset fields', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
  await page.locator('div:nth-child(9) > .ant-card-body > div > .ant-btn').click();
  await page.getByRole('main').getByRole('link', { name: 'SignUp' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('playwrightTest');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Email').fill('pl');
  await page.getByLabel('Email').press('CapsLock');
  await page.getByLabel('Email').fill('play@test.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('playpass');
  await page.getByRole('button', { name: 'Reset' }).click();

  await expect(page.getByLabel('Username')).toHaveValue("");
  await expect(page.getByLabel('Email')).toHaveValue("");
  await expect(page.getByLabel('Password')).toHaveValue("");
});

