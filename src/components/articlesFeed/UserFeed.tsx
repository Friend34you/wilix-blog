import type { PaginationProps} from "antd";
import {Divider, Flex, notification, Pagination, Spin} from "antd";
import articlesStore from "../../store/articlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const UserFeed = observer(() => {
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
    };
  }, [currentPage]);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  if (isLoading && !isSuccess) {
    return <Spin size="large" />;
  }

  if (isSuccess && !articlesStore.articlesCount) {
    return (
      <EmptyBlock align="center" justify="center">
        <h1>Oops there is empty</h1>
      </EmptyBlock>
    );
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
});

const ArticlesWrapper = styled(Flex)`
  background-color: cadetblue;
  min-height: 75vh;
`;

const EmptyBlock = styled(Flex)`
  height: 70vh;
  width: inherit;
`;

export default UserFeed;
