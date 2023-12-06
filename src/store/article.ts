import {makeAutoObservable, runInAction} from "mobx";
import type {IArticle} from "../types/articleType.ts";
import {articlesAPI} from "../api/articlesAPI.ts";

class Article {

  articles: IArticle[] = [];
  articlesCount: number = 0;
  currentArticle: IArticle | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async getArticles() {

    const articlesData = await articlesAPI.fetchArticles()

    runInAction(() => {
      this.articlesCount = articlesData.articles.articlesCount;
      this.articles = articlesData.articles
    })
  }

  async getOneArticle(articleSlug: string) {

    const oneArticleData = await articlesAPI.fetchOneArticle(articleSlug)

    runInAction(() => {
      this.currentArticle = oneArticleData
      console.log(oneArticleData)
    })
  }

}

export default new Article();