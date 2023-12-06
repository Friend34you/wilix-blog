import {makeAutoObservable, runInAction} from "mobx";
import type {IArticle} from "../types/articleType.ts";

class Article {

  articles: IArticle[] = []
  articlesCount: number = 0
  constructor() {
    makeAutoObservable(this)
  }

  async getArticles() {
    const response = await fetch("http://localhost:3000/api/articles");
    const articles = await response.json();
    runInAction(() => {
      this.articlesCount = articles.articlesCount;
      this.articles = articles.articles
    })
    console.log(articles)
  }

}

export default new Article();