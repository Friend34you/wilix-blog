import {useEffect, useState} from "react";
import {RequestModes} from "./requestModes.ts";
import profilesStore from "../../store/profilesStore.ts";
import articlesStore from "../../store/articlesStore.ts";
import {notification} from "antd";

type FetchArticleConfigType = {
  author?: string;
  favorited?: string;
}

export const useProfileArticles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState<string | number>(RequestModes.PROFILE_ARTICLES);

  useEffect(() => {
    let config: FetchArticleConfigType = {
      author: profilesStore.profile!.username,
      favorited: undefined
    };
    if (mode === RequestModes.FAVORITE_ARTICLES) {
      config = {
        author: undefined,
        favorited: profilesStore.profile!.username
      };
    }

    const pageNumberForRequest = (currentPage - 1) * 10;

    setIsLoading(true);
    articlesStore
      .fetchArticles(10, pageNumberForRequest, undefined, config.author, config.favorited)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() =>    {
        setIsLoading(false);
      });

    return () => {
    };
  }, [mode, currentPage]);

  return {
    setCurrentPage,
    setMode,
    mode,
    currentPage,
    isLoading,
    isSuccess
  };
};