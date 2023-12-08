import {makeAutoObservable, runInAction} from "mobx";
import type {IArticle} from "../types/articleType.ts";
import {AxiosInstance} from "../api/axiosInstance.ts";

type newArticleDataType = Pick<IArticle, "title" | "description" | "body" | "tagList">
type articleResponseType = { article: IArticle }
type getArticlesOptionsType = {
  limit?: number,
  offset?: number,
  author?: string,
  tag?: string,
}

class ArticleStore {
  private articlesList: IArticle[] = [];
  articlesCount: number = 0;
  currentArticle: IArticle | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  set articles(articlesData: IArticle[]) {
    this.articlesList = articlesData;
  }

  get articles() {
    return this.articlesList;
  }

  getArticles = async (options: getArticlesOptionsType = {}) => {
    try {
      const response = await AxiosInstance.get("/articles", {
        params: {
          limit: 10,
          offset: 0,
          ...options
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
  };

  getOneArticle = async (articleSlug: string) => {
    try {
      const response = await AxiosInstance.get<articleResponseType>("/articles/" + articleSlug);
      const oneArticleData = response.data;
      this.currentArticle = oneArticleData.article;
    } catch (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };

  toggleFavoriteArticle = async (articleSlug: string) => {
    try {
      const targetArticle = this.articles.find((article) => article.slug === articleSlug)!;

      if (!targetArticle.favorited) {
        await AxiosInstance.post("/articles/" + articleSlug + "/favorite");
        runInAction(() => {
          targetArticle.favorited = true;
          targetArticle.favoritesCount += 1;
        });
        return;
      }

      await AxiosInstance.delete("/articles/" + articleSlug + "/favorite");
      runInAction(() => {
        targetArticle.favorited = false;
        targetArticle.favoritesCount -= 1;
      });
    } catch (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };

  getFavoriteArticles = async (limit: number = 10, offset: number = 0) => {
    try {
      const response = await AxiosInstance.get("/articles/feed", {
        params: {
          limit,
          offset
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
  };

  createArticle = async (newArticleData: newArticleDataType) => {
    try {
      const response = await AxiosInstance.post<articleResponseType>("/articles/", {
        article: newArticleData
      });

      const successfullyCreatedArticle = response.data.article;

      runInAction(() => {
        this.articles.push(successfullyCreatedArticle);
        this.articlesCount += 1;
      });
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };
}

export default new ArticleStore();
