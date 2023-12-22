import {useEffect, useState} from "react";
import articlesStore from "../../store/articlesStore.ts";
import {notification} from "antd";

//используется только в UserFeed компоненте, больше нигде не использовать
export const useUserFeed = (limit = 10, offset = 10) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * offset;

    setIsLoading(true);
    articlesStore
      .getFavoriteArticles(limit, pageNumberForRequest)
      .then(() => setIsSuccess(true))
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsLoading(false));

    return () => {
      setIsSuccess(false);
    };
  }, [limit, offset, currentPage]);

  return {
    isLoading,
    isSuccess,
    currentPage,
    setCurrentPage
  };
};