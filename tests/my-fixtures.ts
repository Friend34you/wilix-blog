import {AuthPage} from "./AuthPage";
import {test as base} from "@playwright/test";

type MyFixtures = {
  authPage: AuthPage
}

export const test = base.extend<MyFixtures>({
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  }
});

export { expect } from '@playwright/test';