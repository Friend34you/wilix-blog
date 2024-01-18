
import {test, expect} from './my-fixtures';

test("try to login", async ({page, authPage}) => {
  await authPage.gotoLogin();
  await authPage.login();
  await expect(page.getByRole('link', {name: 'user playwrightTest'})).toBeVisible();
});

test("try to register", async ({page, authPage}) => {
  await authPage.gotoRegister();
  await authPage.registration();
  await expect(page.getByRole('link', { name: 'user playwrightTest' })).toBeVisible();
});

test("try to reset registration fields", async ({page, authPage}) => {
  await authPage.gotoRegister();
  await authPage.resetFields();

  await expect(page.getByLabel('Username')).toHaveValue("");
  await expect(page.getByLabel('Email')).toHaveValue("");
  await expect(page.getByLabel('Password')).toHaveValue("");
});