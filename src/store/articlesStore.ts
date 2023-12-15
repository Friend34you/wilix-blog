import {makeAutoObservable, runInAction} from "mobx";
import type {IArticle} from "../types/articleType.ts";
import {ApiMethods, AxiosInstance} from "../api/axiosInstance.ts";

type NewArticleDataType = Pick<IArticle, "title" | "description" | "body" | "tagList">
type ArticleResponseType = { article: IArticle }

enum DigitsToOperateWith {
  INCREASE_BY_ONE = 1,
  DECREASE_BY_ONE = -1
}

class ArticlesStore {
  private articlesList: IArticle[] = [];
  private article: IArticle | null = null;
  articlesCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  set articles(articlesData: IArticle[]) {
    this.articlesList = articlesData;
  }

  get articles() {
    return this.articlesList;
  }

  set currentArticle(articleData) {
    this.article = articleData;
  }

  get currentArticle() {
    return this.article;
  }

  //TODO: переименовать, чтобы не было проблем
  getArticles = async (
    limit = 10,
    offset = 0,
    tag?: string,
    author?: string
  ) => {
    try {
      const response = await AxiosInstance.get("/articles", {
        params: {
          limit,
          offset,
          tag,
          author
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
      const response = await AxiosInstance.get<ArticleResponseType>("/articles/" + articleSlug);
      this.currentArticle = response.data.article;
    } catch (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };

  toggleFavoriteArticle = async (articleSlug: string) => {
    try {
      let targetArticle: IArticle;
      if (this.currentArticle && articleSlug === this.currentArticle?.slug) {
        targetArticle = this.currentArticle;
      }
      else {
        targetArticle = this.articles.find((article) => article.slug === articleSlug)!;
      }

      const counterDigitIteration = targetArticle.favorited ? DigitsToOperateWith.DECREASE_BY_ONE : DigitsToOperateWith.INCREASE_BY_ONE;

      await AxiosInstance("/articles/" + articleSlug + "/favorite", {
        method: targetArticle.favorited ? ApiMethods.DELETE : ApiMethods.POST,
      });
      runInAction(() => {
        targetArticle.favorited = !targetArticle.favorited;
        targetArticle.favoritesCount += counterDigitIteration;
      });
    } catch (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };

  getFavoriteArticles = async (limit = 10, offset = 0) => {
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

  createArticle = async (newArticleData: NewArticleDataType) => {
    try {
      const response = await AxiosInstance.post<ArticleResponseType>("/articles/", {
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

export default new ArticlesStore();
