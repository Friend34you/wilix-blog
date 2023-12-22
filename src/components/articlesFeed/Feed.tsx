import TagsCloud from "../TagsCloud.tsx";
import tagsStore from "../../store/tagsStore.ts";
import type { PaginationProps} from "antd";
import {Divider, Flex, notification, Pagination, Spin, Tag} from "antd";
import articlesStore from "../../store/articlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const selectedTag = tagsStore.selectedTag;

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * ARTICLES_OFFSET;

    setIsLoading(true);
    articlesStore
      .fetchArticles(ARTICLES_LIMIT, pageNumberForRequest, selectedTag)
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
  }, [selectedTag, currentPage]);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleOnClose = () => {
    tagsStore.selectedTag = undefined;
  };

  if (isLoading && !isSuccess) {
    return <Spin size="large" />;
  }

  return (
    <>
      <TagsCloud />
      {tagsStore.selectedTag && (
        <Tag
          onClose={handleOnClose}
          closable
        >
          {tagsStore.selectedTag}
        </Tag>
      )}
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
        // vertical
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

export default Feed;
