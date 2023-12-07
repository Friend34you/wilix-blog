import {makeAutoObservable, runInAction} from "mobx";
import type {IArticle} from "../types/articleType.ts";
import {instance} from "../api/axiosInstance.ts";

class Article {
  private _articles: IArticle[] = [];
  //Стоит ли для этмх переменных тоже прописывать get set?
  articlesCount: number = 0;
  currentArticle: IArticle | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  set articles(articlesData: IArticle[]) {
    this._articles = articlesData;
  }

  get articles() {
    return this._articles;
  }

  async getArticles(limit: number = 10, offset: number = 0) {
    try {
      const response = await instance.get("/articles", {
        params: {
          limit: limit,
          offset: offset
        }
      });

      const articlesData = response.data;

      runInAction(() => {
        this.articlesCount = articlesData.articlesCount;
        this.articles = articlesData.articles;
      });
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  }

  async getOneArticle(articleSlug: string) {
    try {
      const response = await instance.get<{ article: IArticle }>("/articles/" + articleSlug);
      const oneArticleData = response.data;

      runInAction(() => {
        this.currentArticle = oneArticleData.article;
      });
    } catch (error) {
      throw new Error("Something went wrong :(" + error);
    }
  }

  async toggleFavoriteArticle(articleSlug: string) {
    try {
      const targetArticle = this.articles.find((article) => article.slug === articleSlug)!;

      if (!targetArticle.favorited) {
        await instance.post<{ article: IArticle }>("/articles/" + articleSlug + "/favorite");
        runInAction(() => {
          targetArticle.favorited = true;
          targetArticle.favoritesCount += 1;
        });
        return;
      }

      await instance.delete<{ article: IArticle }>("/articles/" + articleSlug + "/favorite");
      runInAction(() => {
        targetArticle.favorited = false;
        targetArticle.favoritesCount -= 1;
      });
    } catch (error) {
      throw new Error("Something went wrong :(" + error);
    }
  }

  async getFavoriteArticles(limit: number = 10, offset: number = 0) {
    try {
      const response = await instance.get("/articles/feed", {
        params: {
          limit: limit,
          offset: offset
        }
      });

      const articlesData = response.data;

      runInAction(() => {
        this.articlesCount = articlesData.articlesCount;
        this.articles = articlesData.articles;
      });
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  }

  async createArticle(newArticleData: Pick<IArticle, "title" | "description" | "body" | "tagList">) {
    try {
      const response = await instance.post("/articles/", {
        body: {
          article: newArticleData
        }
      });

      const successfullyCreatedArticle = response.data;

      runInAction(() => {
        this.articles.push(successfullyCreatedArticle);
        this.articlesCount += 1;
      });
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  }
}

export default new Article();
