import {useEffect, useState} from "react";
import articlesStore from "../../store/ArticlesStoreEffector.ts";
import {notification} from "antd";
import {useUnit} from "effector-react/effector-react.umd";

//используется только в UserFeed компоненте, больше нигде не использовать
export const useUserFeed = (limit = 10, offset = 10) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const articlesCount = useUnit(articlesStore.articlesCount);
  const articles = useUnit(articlesStore.articles);

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * offset;

    setIsLoading(true);
    articlesStore
      .getFavoriteArticles({
        limit,
        offset: pageNumberForRequest
      })
      .then(() => setIsSuccess(true))
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsLoading(false));

    return () => {
      setIsSuccess(false);
    };
  }, [limit, offset, currentPage]);

  return {
    articles,
    articlesCount,
    isLoading,
    isSuccess,
    currentPage,
    setCurrentPage
  };
};