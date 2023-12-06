import {makeAutoObservable, runInAction} from "mobx";
import type {IArticle} from "../types/articleType.ts";
import {instance} from "../api/axiosInstance.ts";

class Article {

  articles: IArticle[] = [];
  articlesCount: number = 0;
  currentArticle: IArticle | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async getArticles(limit: number = 10, offset: number = 0) {
    try {
      const response = await instance.get("/articless", {
        params: {
          limit: limit,
          offset: offset
        }
      })

      const articlesData = response.data

      runInAction(() => {
        this.articlesCount = articlesData.articlesCount;
        this.articles = articlesData.articles
      })
    } catch (error) {
      throw new Error()
    }
  }

  async getOneArticle(articleSlug: string) {

    try {
      const response = await instance.get<{ article: IArticle }>("/articles/" + articleSlug)
      const oneArticleData = response.data

      runInAction(() => {
        this.currentArticle = oneArticleData.article
      })
    } catch (error) {
      throw new Error()
    }
  }
}

export default new Article();