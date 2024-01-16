import {test, expect} from '@playwright/test';
import {loadEnv} from "vite";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
});

test('try to signIn', async ({page}) => {
  const env = {...loadEnv("", "./")};

  await page.getByRole('link', {name: 'SignIn'}).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill(env.VITE_TEST_LOGIN!);
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill(env.VITE_TEST_PASSWORD!);

  await page.route("*/**/api/users/login", async (route) => {
    await route.fulfill({
      json: {
        "user": {
          "username": "playwrightTest",
          "email": "play@test.com",
          "token": "token"
        }
      }
    });
  });
  await page.getByLabel('Password').press('Enter');
  await expect(page.getByRole('link', {name: 'user playwrightTest'})).toBeVisible();
});

test('try to reset fields', async ({ page }) => {
  await page.locator('div:nth-child(9) > .ant-card-body > div > .ant-btn').click();
  await page.getByRole('main').getByRole('link', { name: 'SignUp' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('playwrightTest');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Email').fill('play@test.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('playpass');
  await page.getByRole('button', { name: 'Reset' }).click();

  await expect(page.getByLabel('Username')).toHaveValue("");
  await expect(page.getByLabel('Email')).toHaveValue("");
  await expect(page.getByLabel('Password')).toHaveValue("");
});

test('registration', async ({ page }) => {
  await page.getByRole('link', { name: 'SignUp' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('playwrightTest');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Email').fill('play@test.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('playpass');

  await page.route("*/**/api/users", async (route) => {
    await route.fulfill({
      json: {
        user: {
          username: 'playwrightTest',
          email: 'play@test.com',
          token: 'token'
        }
      }
    });
  });

  await page.getByLabel('Password').press('Enter');
  await expect(page.getByRole('link', { name: 'user playwrightTest' })).toBeVisible();
});

