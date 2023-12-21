import type {PaginationProps} from "antd";
import {Divider, Flex, notification, Pagination, Segmented, Spin} from "antd";
import styled from "styled-components";
import {useEffect, useState} from "react";
import articlesStore from "../store/articlesStore.ts";
import {observer} from "mobx-react-lite";
import tagsStore from "../store/tagsStore.ts";
import {RequestModes} from "../types/requestModes.ts";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const articlesOptions = [RequestModes.ALL_ARTICLES_FEED, RequestModes.YOUR_ARTICLES_FEED];

const Articles = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [mode, setMode] = useState<string | number>(RequestModes.PROFILE_ARTICLES);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageNumberForRequest = (currentPage - 1) * ARTICLES_OFFSET;

    setIsLoading(true);
    articlesStore
      .fetchArticles(ARTICLES_LIMIT, pageNumberForRequest, tagsStore.selectedTag)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => {
        setIsLoading(false);
      });
  }, [mode, currentPage]);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleOnModeChange = (option: string | number) => {
    tagsStore.selectedTag = undefined;
    setMode(option);
    setCurrentPage(1);
  };

  if (isLoading && !isSuccess) {
    return (
      <Flex>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex>
      <Segmented
        options={articlesOptions}
        value={mode}
        onChange={handleOnModeChange}
      />
      <Divider/>
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesStore.articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
      <ArticlesWrapper>
        здесь чет б
      </ArticlesWrapper>
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesStore.articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
    </Flex>
  );
});

const ArticlesWrapper = styled(Flex)`
  background-color: cadetblue;
`;

export default Articles;