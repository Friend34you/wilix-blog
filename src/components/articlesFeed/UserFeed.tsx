import type { PaginationProps} from "antd";
import {Divider, Pagination, Spin} from "antd";
import articlesStore from "../../store/ArticlesStore.ts";
import {ArticlesWrapper, EmptyBlock} from "./StyledFeedCommon.ts";
import ArticleCard from "../ArticleCard.tsx";
import {useUserFeed} from "./useUserFeed.ts";
import {useUnit} from "effector-react";
import usersStore from "../../store/UsersStore.ts";
import {useNavigate} from "react-router-dom";
import {useFavoriteError} from "../../hooks/useFavoriteError.ts";
import {useCallback} from "react";
import {Routes} from "../router/routesPaths.ts";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const UserFeed = () => {
  const {
    articles,
    articlesCount,
    currentPage,
    isLoading,
    isSuccess,
    setCurrentPage
  } = useUserFeed(ARTICLES_LIMIT, ARTICLES_OFFSET);

  const isUserAuth = useUnit(usersStore.isUserAuth);
  const navigate = useNavigate();

  useFavoriteError();
  const handleOnFavoriteClick = useCallback((slug: string) => {
    return () => {
      if (!isUserAuth) {
        navigate(Routes.AUTHORIZATION);
        return;
      }
      articlesStore.toggleFavoriteArticle(slug);
    };
  }, [isUserAuth, navigate]);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  if (isLoading || !isSuccess) {
    return <Spin size="large" />;
  }

  if (isSuccess && !articlesCount) {
    return (
      <EmptyBlock
        align="center"
        justify="center"
      >
        <h1>Oops there is empty</h1>
      </EmptyBlock>
    );
  }

  return (
    <>
      <Divider/>
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
      <ArticlesWrapper
        align="flex-start"
        justify="center"
        wrap="wrap"
      >
        {articles.map((articleItem) => (
          <ArticleCard
            {...articleItem}
            key={articleItem.slug}
            onFavoriteClick={handleOnFavoriteClick(articleItem.slug)}
          />
        ))}
      </ArticlesWrapper>
      <Pagination
        onChange={handleOnPageNumberChange}
        total={articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
    </>
  );
};

export default UserFeed;
