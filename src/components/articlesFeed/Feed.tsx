import TagsCloud from "../TagsCloud.tsx";
import tagsStore from "../../store/TagsStore.ts";
import type { PaginationProps} from "antd";
import {Divider, notification, Pagination, Spin, Tag} from "antd";
import articlesStore from "../../store/ArticlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import {ArticlesWrapper, EmptyBlock} from "./StyledFeedCommon.ts";
import {useFeed} from "./useFeed.ts";
import {useUnit} from "effector-react";
import {useEffect} from "react";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const Feed = () => {
  const {
    articles,
    articlesCount,
    isLoading,
    isSuccess,
    currentPage,
    selectedTag,
    setCurrentPage
  } = useFeed(ARTICLES_LIMIT, ARTICLES_OFFSET);

  //TODO: можно вывнести в отдельный хук и использовать в хуках "страниц-компонентов"
  const toggleFavoriteError = useUnit(articlesStore.toggleFavoriteError);

  useEffect(() => {
    if (toggleFavoriteError) {
      notification.error({message: toggleFavoriteError.message});
    }

    return () => {
      articlesStore.toggleFavoriteErrorDefaulted();
    };
  }, [toggleFavoriteError]);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleOnClose = () => {
    tagsStore.selectedTag(null);
  };

  const handleOnFavoriteClick = (slug: string) => {
    return () => articlesStore.toggleFavoriteArticle(slug);
  };

  if (isLoading || !isSuccess) {
    return (
      <>
        <TagsCloud />
        {selectedTag && (
          <Tag
            onClose={handleOnClose}
            color="#3C13AF"
            closable
          >
            {selectedTag}
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
      {selectedTag && (
        <Tag
          onClose={handleOnClose}
          color="#3C13AF"
          closable
        >
          {selectedTag}
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
