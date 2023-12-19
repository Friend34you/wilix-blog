import styled from "styled-components";
import type { PaginationProps} from "antd";
import {Flex, notification, Pagination, Segmented, Spin} from "antd";
import type {FC} from "react";
import { useEffect, useState} from "react";
import articlesStore from "../../store/articlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import {observer} from "mobx-react-lite";

type ProfileArticlesProps = {
  readonly profileName: string
}

type FetchArticleConfigType = {
  author?: string;
  favorited?: string;
}

enum RequestMode {
  PROFILE_ARTICLES = "Articles",
  FAVORITE_ARTICLES = "Favorite Articles"
}

const ProfileArticles: FC<ProfileArticlesProps> = observer(({profileName}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState<string | number>(RequestMode.PROFILE_ARTICLES);

  useEffect(() => {
    let config: FetchArticleConfigType = {
      author: profileName,
      favorited: undefined
    };
    if (mode === RequestMode.FAVORITE_ARTICLES) {
      config = {
        author: undefined,
        favorited: profileName
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
  }, [mode, profileName, currentPage]);

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
  height: 90vh;
  overflow: scroll;

  @media (max-width: 1600px) {
    height: auto;
    width: 100vw;
    margin: 0;
    overflow: hidden;
  }
`;

export default ProfileArticles;