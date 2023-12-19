import styled from "styled-components";
import type { PaginationProps} from "antd";
import {Divider, Flex, notification, Pagination, Segmented, Spin} from "antd";
import { useEffect, useState} from "react";
import articlesStore from "../../store/articlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import {observer} from "mobx-react-lite";
import profilesStore from "../../store/profilesStore.ts";

type FetchArticleConfigType = {
  author?: string;
  favorited?: string;
}

enum RequestMode {
  PROFILE_ARTICLES = "Articles",
  FAVORITE_ARTICLES = "Favorite Articles"
}

const ProfileArticles = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState<string | number>(RequestMode.PROFILE_ARTICLES);

  useEffect(() => {
    let config: FetchArticleConfigType = {
      author: profilesStore.profile!.username,
      favorited: undefined
    };
    if (mode === RequestMode.FAVORITE_ARTICLES) {
      config = {
        author: undefined,
        favorited: profilesStore.profile!.username
      };
    }

    setIsLoading(true);
    articlesStore
      .fetchArticles(10, (currentPage - 1) * 10, undefined, config.author, config.favorited)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() =>    {
        setIsLoading(false);
      });

    return () => {
    };
  }, [mode, currentPage]);

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
      >
        <Spin size="large" />
      </ProfileArticlesWrapper>
    );
  }

  return (
    <ProfileArticlesWrapper
      vertical
      align="center"
    >
      <Segmented
        options={[RequestMode.PROFILE_ARTICLES, RequestMode.FAVORITE_ARTICLES]}
        value={mode}
        onChange={handleOnModeChange}
      />
      <Divider />
      <Pagination
        simple
        showSizeChanger={false}
        current={currentPage}
        total={articlesStore.articlesCount}
        onChange={handleOnPageNumberChange}
      />
      <Flex vertical>
        {articlesStore.articles.map(articleItem => (
          <ArticleCard
            {...articleItem}
            key={articleItem.slug}
            onFavoriteClick={() => articlesStore.toggleFavoriteArticle(articleItem.slug)}
          />
        ))}
      </Flex>
      {!articlesStore.articlesCount && (
        <EmptyBlock align="center" justify="center">
          <h1>Oops there is empty</h1>
        </EmptyBlock>
      )}
      <Pagination
        simple
        showSizeChanger={false}
        current={currentPage}
        total={articlesStore.articlesCount}
        onChange={handleOnPageNumberChange}
      />
    </ProfileArticlesWrapper>
  );
});

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
  height: inherit;
  width: inherit;
`;

export default ProfileArticles;