import {test, expect} from '@playwright/test';
import {loadEnv} from "vite";

test('try to see user feed (unauthorized)', async ({page}) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
  await page.getByText('Global articles feed').click();
  await page.getByText('Global articles feed').click();
  await expect(page.getByText('Global articles feed')).toBeVisible();
  await page.getByText('Your articles feed').click();
  await expect(page.getByRole('heading', {name: 'Authorization'})).toBeVisible();
});

test('try to see user feed (with auth)', async ({ page }) => {
  const env = {...loadEnv("", "./")};

  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
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

test('try to signIn', async ({page}) => {
  const env = {...loadEnv("", "./")};

  await page.goto('http://localhost:5173/');
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

  await page.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    localStorage.removeItem("token");
  });
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

test('registration', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/articles/');
  await page.getByRole('link', { name: 'SignUp' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('playwrightTest');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Email').fill('play@test.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('playpass');

  await page.route("*/**/api/users", async (route) => {
    const json = {
      user: {
        username: 'playwrightTest',
        email: 'play@test.com',
        token: 'token'
      }
    };
    await route.fulfill({json});
  });

  await page.getByLabel('Password').press('Enter');

  await expect(page.getByRole('link', { name: 'user playwrightTest' })).toBeVisible();
});

