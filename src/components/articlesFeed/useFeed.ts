import {useEffect, useState} from "react";
import articlesStore from "../../store/ArticlesStore.ts";
import {notification} from "antd";
import tagsStore from "../../store/TagsStore.ts";
import {useUnit} from "effector-react/effector-react.umd";

//используется только в Feed компоненте, больше нигде не использовать
export const useFeed = (limit = 10, offset = 10) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const articlesCount = useUnit(articlesStore.articlesCount);
  const articles = useUnit(articlesStore.articles);
  const selectedTagValue = useUnit(tagsStore.selectedTagValue);

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * offset;

    setIsLoading(true);
    articlesStore
      .fetchArticles({
        limit,
        offset: pageNumberForRequest,
        tag: selectedTagValue
      })
      .then(() => setIsSuccess(true))
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsLoading(false));

    return () => {
      setIsSuccess(false);
    };
  }, [limit, offset, selectedTagValue, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTagValue]);

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
    selectedTagValue: selectedTagValue,
    setCurrentPage
  };
};