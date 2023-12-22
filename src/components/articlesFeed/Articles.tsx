import type {PaginationProps} from "antd";
import {Divider, Flex, notification, Pagination, Segmented, Spin, Tag} from "antd";
import styled from "styled-components";
import {useEffect, useState} from "react";
import articlesStore from "../../store/articlesStore.ts";
import {observer} from "mobx-react-lite";
import tagsStore from "../../store/tagsStore.ts";
import {RequestModes} from "../../types/requestModes.ts";
import TagsCloud from "../TagsCloud.tsx";
import ArticleCard from "../ArticleCard.tsx";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const articlesOptions = [RequestModes.ALL_ARTICLES_FEED, RequestModes.YOUR_ARTICLES_FEED];

const Articles = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [mode, setMode] = useState<string | number>(RequestModes.PROFILE_ARTICLES);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedTag = tagsStore.selectedTag;

  useEffect(() => {
    console.log("rerender");
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
    };
  }, [selectedTag, mode, currentPage]);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleOnModeChange = (option: string | number) => {
    tagsStore.selectedTag = undefined;
    setMode(option);
    setCurrentPage(1);
  };

  const handleOnClose = () => {
    tagsStore.selectedTag = undefined;
  };

  if (isLoading && !isSuccess) {
    return (
      <Wrapper
        align="center"
        justify="center"
        vertical
      >
        <Spin size="large" />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      align="center"
      vertical
    >
      <Segmented
        options={articlesOptions}
        value={mode}
        onChange={handleOnModeChange}
      />
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
    </Wrapper>
  );
});

const ArticlesWrapper = styled(Flex)`
  background-color: cadetblue;
`;

const Wrapper = styled(Flex)`
  padding: 10px;
  min-height: 80vh;
`;

export default Articles;