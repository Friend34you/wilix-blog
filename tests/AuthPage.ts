import type {Page, Locator} from '@playwright/test';
import {loadEnv} from "vite";

export class AuthPage {
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly resetButton: Locator;
  private readonly env:  {[p: string]: string};

  constructor(public readonly page: Page) {
    this.usernameInput = this.page.getByLabel('Username');
    this.emailInput = this.page.getByLabel('Email');
    this.passwordInput = this.page.getByLabel('Password');
    this.resetButton = this.page.getByRole('button', { name: 'Reset' });
    this.env = {...loadEnv("", "./")};
  }
  gotoLogin = async () => {
    await this.page.goto('http://localhost:5173/login');
   };

  gotoRegister = async () => {
    await this.page.goto('http://localhost:5173/register');
  };

  private inputRegistrationFields = async () => {
    await this.usernameInput.click();
    await this.usernameInput.fill('playwrightTest');
    await this.usernameInput.press('Tab');
    await this.emailInput.fill('play@test.com');
    await this.emailInput.press('Tab');
    await this.passwordInput.fill('playpass');
  };

  resetFields = async () => {
    this.inputRegistrationFields();
    await this.resetButton.click();
  };

  login = async () => {
    await this.emailInput.click();
    await this.emailInput.fill(this.env.VITE_TEST_LOGIN);
    await this.emailInput.press('Tab');
    await this.page.route("*/**/api/users/login", async (route) => {
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

    await this.passwordInput.fill(this.env.VITE_TEST_PASSWORD);
    await this.passwordInput.press('Tab');
    await this.passwordInput.press('Enter');
  };

  registration = async () => {
    await this.inputRegistrationFields();
    await this.page.route("*/**/api/users", async (route) => {
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

    await this.passwordInput.press('Enter');
  };
}