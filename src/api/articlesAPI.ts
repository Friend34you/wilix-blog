import {instance} from "./axiosInstance.ts";

export const articlesAPI = {
  fetchArticles: async () => {
    try {

      const response = await instance.get("/api/articles")
      return response.data

    } catch (e) {
      return e
    }
  },

  fetchOneArticle: async (articleSlug: string) => {
    try {

      const response = await instance.get("api/articles/" + articleSlug)
      return response.data

    } catch (e) {
      return e
    }
  }
}