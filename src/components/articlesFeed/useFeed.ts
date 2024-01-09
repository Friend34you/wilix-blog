import {useEffect, useState} from "react";
import articlesStore from "../../store/ArticlesStoreEffector.ts";
import {notification} from "antd";
import tagsStore from "../../store/TagsStoreEffector";
import {useUnit} from "effector-react/effector-react.umd";

//используется только в Feed компоненте, больше нигде не использовать
export const useFeed = (limit = 10, offset = 10) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const articlesCount = useUnit(articlesStore.articlesCount);
  const articles = useUnit(articlesStore.articles);
  const selectedTag = useUnit(tagsStore.selectedTagValue);

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * offset;

    setIsLoading(true);
    articlesStore
      .fetchArticles({
        limit,
        offset: pageNumberForRequest,
        tag: selectedTag
      })
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
    articles,
    articlesCount,
    isLoading,
    isSuccess,
    currentPage,
    selectedTag,
    setCurrentPage
  };
};