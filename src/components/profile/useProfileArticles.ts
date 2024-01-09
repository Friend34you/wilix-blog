import {useEffect, useState} from "react";
import {RequestModes} from "../../types/requestModes.ts";
import profilesStore from "../../store/profilesStore.ts";
import articlesStore from "../../store/ArticlesStoreEffector.ts";
import {notification} from "antd";

type FetchArticleConfigType = {
  author?: string;
  favorited?: string;
}

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

//Хук используется в компоненте, где мы уверены, что profileStore.profile есть.
//Больше нигде нет смысла использовать
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
    if (mode === RequestModes.PROFILE_FAVORITE_ARTICLES) {
      config = {
        author: undefined,
        favorited: profilesStore.profile!.username
      };
    }

    const pageNumberForRequest = (currentPage - 1) * ARTICLES_OFFSET;

    setIsLoading(true);
    articlesStore
      .fetchArticles({
        limit:  ARTICLES_LIMIT,
        offset: pageNumberForRequest,
        author: config.author,
        favorited: config.favorited
      })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() =>    {
        setIsLoading(false);
      });
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