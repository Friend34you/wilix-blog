import {createEffect, createEvent, createStore, sample} from "effector";
import {ApiMethods, AxiosInstance} from "../api/axiosInstance";
import type {IArticle} from "../types/articleType";

type NewArticleDataType = Pick<IArticle, "title" | "description" | "body" | "tagList">
type ArticleResponseType = { article: IArticle }
type FetchArticlesParamsType = {
  limit: number,
  offset: number,
  tag?: string,
  author?: string,
  favorited?: string,
}

type ToggleFavoriteArticleParamsType = {
  articleSlug: string,
  targetArticle: IArticle
}

enum DigitsToOperateWith {
  INCREASE_BY_ONE = 1,
  DECREASE_BY_ONE = -1
}

//Сторы
const $articles = createStore<IArticle[]>([]);
const $currentArticle = createStore<IArticle | null>(null);
const $articlesCount = createStore<number>(0);
const $toggleFavoriteError = createStore<Error | null>(null);

//Ивенты
const articleFavoritedToggled = createEvent<string>();
const currentArticleDefaulted = createEvent();
const articleFromCurrentArticleStoreTook = createEvent<ToggleFavoriteArticleParamsType>();
const articleFromArticlesStoreTook = createEvent<ToggleFavoriteArticleParamsType>();

//Эффекты
const fetchArticlesFx = createEffect(async ({
  limit = 10,
  offset = 0,
  tag,
  author,
  favorited
}: FetchArticlesParamsType) => {
  try {
    const response = await AxiosInstance.get("/articles", {
      params: {
        limit,
        offset,
        tag,
        author,
        favorited
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error: Something went wrong :( " + error);
  }
});

const getOneArticleFx = createEffect(async (articleSlug: string) => {
  try {
    const response = await AxiosInstance.get<ArticleResponseType>("/articles/" + articleSlug);
    return response.data.article;
  } catch (error) {
    throw new Error("Something went wrong :(" + error);
  }
});

const toggleFavoriteArticleFx = createEffect(async ({
  articleSlug,
  targetArticle
}: ToggleFavoriteArticleParamsType) => {
  try {
    const counterDigitIteration = targetArticle?.favorited ? DigitsToOperateWith.DECREASE_BY_ONE : DigitsToOperateWith.INCREASE_BY_ONE;

    await AxiosInstance("/articles/" + articleSlug + "/favorite", {
      method: targetArticle?.favorited ? ApiMethods.DELETE : ApiMethods.POST,
    });

    return {
      favorited: !targetArticle.favorited,
      counterDigitIteration,
      articleSlug
    };
  } catch (error) {
    throw new Error("Something went wrong :(" + error);
  }
});

const getFavoriteArticlesFx = createEffect(async ({limit = 10, offset = 0}) => {
  try {
    const response = await AxiosInstance.get("/articles/feed", {
      params: {
        limit,
        offset
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error: Something went wrong :( " + error);
  }
});

const createArticleFx = createEffect(async (newArticleData: NewArticleDataType) => {
  try {
    const response = await AxiosInstance.post<ArticleResponseType>("/articles/", {
      article: newArticleData
    });
    return response.data.article;
  } catch (error) {
    throw new Error("Error: Something went wrong :( " + error);
  }
});

//Взаимодействие
sample({
  clock: articleFavoritedToggled,
  source: {
    currentArticle: $currentArticle,
    articles: $articles
  },
  filter: (source, slug) => source.currentArticle?.slug !== slug,
  fn: (articlesData, articleSlug) => ({
    targetArticle: articlesData.articles.find((article) => article.slug === articleSlug)!,
    articleSlug
  }),
  target: articleFromCurrentArticleStoreTook
});

sample({
  clock: articleFavoritedToggled,
  source: $currentArticle,
  filter: (currentArticle, slug) => currentArticle?.slug === slug,
  fn: (targetArticle, articleSlug) => ({
    targetArticle: targetArticle!,
    articleSlug
  }),
  target: articleFromCurrentArticleStoreTook
});

sample({
  clock: articleFromArticlesStoreTook,
  target: toggleFavoriteArticleFx,
});

sample({
  clock: articleFromCurrentArticleStoreTook,
  target: toggleFavoriteArticleFx,
});

$articles.on(createArticleFx.doneData, (state, newArticleData) => ({...state, newArticleData}));
$articles.on(fetchArticlesFx.doneData, (_, data) => data.articles);
$articles.on(getFavoriteArticlesFx.doneData, (_, articles) => articles);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
$articles.on(toggleFavoriteArticleFx.doneData, (state, newData) => state.map((article) => {
  if (article.slug === newData.articleSlug) {
    return {
      ...article,
      favorited: newData.favorited,
      favoritesCount: article.favoritesCount + newData.counterDigitIteration
    };
  }
}));

$currentArticle.on(toggleFavoriteArticleFx.doneData, (state, newData) => ({
  ...state!,
  favorited: newData.favorited,
  favoritesCount: state!.favoritesCount + newData.counterDigitIteration
}));
$currentArticle.reset(currentArticleDefaulted);
$currentArticle.on(getOneArticleFx.doneData,(_, article) => article);

$articlesCount.on(createArticleFx.doneData, (count) => count + 1);
$articlesCount.on(fetchArticlesFx.doneData, (_, data) => data.articlesCount);

$toggleFavoriteError.on(toggleFavoriteArticleFx.failData, (_, error) => error);
$toggleFavoriteError.reset(toggleFavoriteArticleFx.doneData);

const articlesStore = {
  articles: $articles,
  currentArticle: $currentArticle,
  fetchArticles: fetchArticlesFx,
  getOneArticle: getOneArticleFx,
  createArticle: createArticleFx,
  toggleFavoriteLoading: toggleFavoriteArticleFx.pending,
  toggleFavoriteError: $toggleFavoriteError,
  articleFavoritedToggled,
  currentArticleDefaulted,
};

export default articlesStore;
