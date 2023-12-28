import TagsCloud from "../TagsCloud.tsx";
import tagsStore from "../../store/TagsStoreEffector";
import type { PaginationProps} from "antd";
import {Divider, Pagination, Spin, Tag} from "antd";
import articlesStore from "../../store/articlesStore.ts";
import ArticleCard from "../ArticleCard.tsx";
import {observer} from "mobx-react-lite";
import {ArticlesWrapper, EmptyBlock} from "./StyledFeedCommon.ts";
import {useFeed} from "./useFeed.ts";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const Feed = observer(() => {
const {
  isLoading,
  isSuccess,
  currentPage,
  selectedTag,
  setCurrentPage
} = useFeed(ARTICLES_LIMIT, ARTICLES_OFFSET);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleOnClose = () => {
    tagsStore.selectedTag(null);
  };

  if (isLoading && !isSuccess) {
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

  if (isSuccess && !articlesStore.articlesCount) {
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
        total={articlesStore.articlesCount}
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

export default Feed;
