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
      const response = await instance.get("/articles", {
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
      throw new Error("Error: Something went wrong :( " + error)
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
      throw new Error("Something went wrong :(" + error)
    }
  }

  async toggleFavoriteArticle(articleSlug: string) {
    try {
      const targetArticle = this.articles.find((article) => article.slug === articleSlug)!
      if (!targetArticle.favorited) {
        console.log("тык фоллоу")
        // await instance.post<{ article: IArticle }>("/articles/" + articleSlug + "/favorite")

        runInAction(() => {
          targetArticle.favorited = true
        })
        return;
      }

      // await instance.delete<{ article: IArticle }>("/articles/" + articleSlug + "/favorite")
      console.log("тык онфолллов")
      runInAction(() => {
        this.articles.find((article) => article.slug === articleSlug)!.favorited = false
      })
      return;
    } catch (error) {
      throw new Error("Something went wrong :(" + error)
    }
  }

  // async unfavoriteArticle(articleSlug: string) {
  //   try {
  //     // await instance.post<{ article: IArticle }>("/articles/" + articleSlug + "/favorite")
  //
  //     runInAction(() => {
  //       this.articles.find((article) => article.slug === articleSlug)!.favorited = true
  //     })
  //   } catch (error) {
  //     throw new Error("Something went wrong :(" + error)
  //   }
  // }
}

export default new Article();