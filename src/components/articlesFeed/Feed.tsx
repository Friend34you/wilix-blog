import TagsCloud from "../TagsCloud.tsx";
import tagsStore from "../../store/TagsStore.ts";
import type { PaginationProps} from "antd";
import {Divider, Pagination, Spin, Tag} from "antd";
import articlesStore from "../../store/ArticlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import {ArticlesWrapper, EmptyBlock} from "./StyledFeedCommon.ts";
import {useFeed} from "./useFeed.ts";
import {useFavoriteError} from "../../hooks/useFavoriteError.ts";
import {useNavigate} from "react-router-dom";
import {useUnit} from "effector-react";
import usersStore from "../../store/UsersStore.ts";
import {useCallback} from "react";
import {Routes} from "../router/routesPaths.ts";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const Feed = () => {
  const {
    articles,
    articlesCount,
    isLoading,
    isSuccess,
    currentPage,
    selectedTagValue,
    setCurrentPage
  } = useFeed(ARTICLES_LIMIT, ARTICLES_OFFSET);

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

  const handleOnClose = () => {
    tagsStore.selectedTag(null);
  };

  if (isLoading || !isSuccess) {
    return (
      <>
        <TagsCloud />
        {selectedTagValue && (
          <Tag
            onClose={handleOnClose}
            color="#3C13AF"
            closable
          >
            {selectedTagValue}
          </Tag>
        )}
        <Spin size="large" />
      </>
    );
  }

  if (isSuccess && !articlesCount) {
    return (
        <EmptyBlock align="center" justify="center">
          <h1>Oops there is empty</h1>
        </EmptyBlock>
    );
  }

  return (
    <>
      <TagsCloud />
      {selectedTagValue && (
        <Tag
          onClose={handleOnClose}
          color="#3C13AF"
          closable
        >
          {selectedTagValue}
        </Tag>
      )}
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
        gap={10}
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

export default Feed;
