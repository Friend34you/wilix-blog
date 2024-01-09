import styled from "styled-components";
import type { PaginationProps} from "antd";
import {Divider, Flex, Pagination, Segmented, Spin} from "antd";
import articlesStore from "../../store/ArticlesStoreEffector.ts";
import ArticleCard from "../ArticleCard.tsx";
import {RequestModes} from "../../types/requestModes.ts";
import {useProfileArticles} from "./useProfileArticles.ts";
import {useUnit} from "effector-react";

const articlesOptions = [RequestModes.PROFILE_ARTICLES, RequestModes.PROFILE_FAVORITE_ARTICLES];

const ProfileArticles = () => {
  const {
    mode,
    currentPage,
    setMode,
    setCurrentPage,
    isSuccess,
    isLoading
  } = useProfileArticles();

  const articles = useUnit(articlesStore.articles);
  const articlesCount = useUnit(articlesStore.articlesCount);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleOnModeChange = (option: string | number) => {
    setMode(option);
    setCurrentPage(1);
  };

  if (isLoading || !isSuccess) {
    return (
      <ProfileArticlesWrapper
        vertical
        align="center"
        justify="center"
      >
        <Spin size="large" />
      </ProfileArticlesWrapper>
    );
  }

  if (isSuccess && !articlesCount) {
    return (
      <ProfileArticlesWrapper
        vertical
        align="center"
      >
        <Segmented
          options={articlesOptions}
          value={mode}
          onChange={handleOnModeChange}
        />
        <Divider />
        <EmptyBlock align="center" justify="center">
          <h1>Oops there is empty</h1>
        </EmptyBlock>
      </ProfileArticlesWrapper>
    );
  }

  return (
    <ProfileArticlesWrapper
      vertical
      align="center"
    >
      <Segmented
        options={articlesOptions}
        value={mode}
        onChange={handleOnModeChange}
      />
      <Divider />
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
      <Flex vertical>
        {articles.map(articleItem => (
          <ArticleCard
            {...articleItem}
            key={articleItem.slug}
            onFavoriteClick={() => articlesStore.toggleFavoriteArticle(articleItem.slug)}
          />
        ))}
      </Flex>
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
    </ProfileArticlesWrapper>
  );
};

const ProfileArticlesWrapper = styled(Flex)`
  margin-left: 18vw;
  padding: 10px;
  height: inherit;

  @media (max-width: 1600px) {
    height: auto;
    width: 100vw;
    margin: 0;
    overflow: hidden;
  }
`;

const EmptyBlock = styled(Flex)`
  height: 70vh;
  width: inherit;
`;

export default ProfileArticles;