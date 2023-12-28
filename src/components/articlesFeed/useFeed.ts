import {useEffect, useState} from "react";
import articlesStore from "../../store/articlesStore.ts";
import {notification} from "antd";
import tagsStore from "../../store/TagsStoreEffector";
import {useUnit} from "effector-react/compat";

//используется только в Feed компоненте, больше нигде не использовать
export const useFeed = (limit = 10, offset = 10) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const selectedTag = useUnit(tagsStore.selectedTagValue);

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * offset;

    setIsLoading(true);
    articlesStore
      .fetchArticles(limit, pageNumberForRequest, selectedTag)
      .then(() => setIsSuccess(true))
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsLoading(false));

    return () => {
      setIsSuccess(false);
    };
  }, [limit, offset, selectedTag, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  useEffect(() => {
    return () => {
      tagsStore.selectedTag(null);
    };
  }, []);

  return {
    isLoading,
    isSuccess,
    currentPage,
    selectedTag,
    setCurrentPage
  };
};