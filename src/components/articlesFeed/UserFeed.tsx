import tagsStore from "../../store/tagsStore.ts";
import type { PaginationProps} from "antd";
import {Divider, Flex, notification, Pagination, Spin} from "antd";
import articlesStore from "../../store/articlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const UserFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * ARTICLES_OFFSET;

    setIsLoading(true);
    articlesStore
      .getFavoriteArticles(ARTICLES_LIMIT, pageNumberForRequest)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setIsSuccess(false);
      tagsStore.selectedTag = undefined;
    };
  }, [currentPage]);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  if (isLoading && !isSuccess) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Divider/>
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesStore.articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
      <ArticlesWrapper
        align="center"
        justify="center"
        wrap="wrap"
      >
        {articlesStore.articles.map((articleItem) => (
          <ArticleCard
            {...articleItem}
            key={articleItem.slug}
            onFavoriteClick={() => articlesStore.toggleFavoriteArticle(articleItem.slug)}
          />
        ))}
      </ArticlesWrapper>
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesStore.articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
    </>
  );
};

const ArticlesWrapper = styled(Flex)`
  background-color: cadetblue;
`;

export default UserFeed;
