import type {Page, Locator} from '@playwright/test';
import {articlesFeed} from "./mock-data/articles_feed";
import {article} from "./mock-data/article";

export class AuthPage {
  private readonly userFeedButton: Locator;
  private readonly articleLabel: Locator;
  private readonly firstTagInCloud: Locator;
  private readonly closeTagButton: Locator;

  constructor(public readonly page: Page) {
    this.userFeedButton = this.page.getByText('Global articles feed');
    this.articleLabel = this.page.getByRole('link', {name: 'Серезный пост с большим заголо Какое-то описание максимальной длины'});
    this.firstTagInCloud = this.page.getByText('wilix').nth(1);
    this.closeTagButton = this.page.getByLabel('close').locator('path');
  }

  gotoArticles = async () => {
    await this.page.goto('http://localhost:5173/articles/');
   };

  loadArticles = async () => {
    await this.page.route("*/**/api/articles?limit=10&offset=0", (route) => {
      route.fulfill({json: articlesFeed});
    });

    await this.page.goto('http://localhost:5173/articles/');
  };

  loadOneArticle = async () => {
    await this.page.route("*/**/api/articles/*", async (route) => {
      await route.fulfill({json: article});
    });

    await this.page.goto('http://localhost:5173/articles/');
    await this.articleLabel.click();
  };

  seeUserFeed = async () => {
    await  this.userFeedButton.click();
  };

  clikOnTag = async () => {
    await this.page.route("*/**/api/tags", (route) => {
      const json = {
        tags: ["wilix", "tag1", "tag2", "tag3"]
      };

      route.fulfill({json});
    });

    await this.page.goto('http://localhost:5173/articles/');

    await this.firstTagInCloud.click();
    await this.closeTagButton.click();
  };
}