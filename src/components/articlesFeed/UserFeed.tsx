import type { PaginationProps} from "antd";
import {Divider, Pagination, Spin} from "antd";
import articlesStore from "../../store/articlesStore.ts";
import {ArticlesWrapper, EmptyBlock} from "./StyledFeedCommon.ts";
import ArticleCard from "../ArticleCard.tsx";
import {observer} from "mobx-react-lite";
import {useUserFeed} from "./useUserFeed.ts";

const ARTICLES_LIMIT = 10;
const ARTICLES_OFFSET = 10;

const UserFeed = observer(() => {
  const {
    currentPage,
    isLoading,
    isSuccess,
    setCurrentPage
  } = useUserFeed(ARTICLES_LIMIT, ARTICLES_OFFSET);

  const handleOnPageNumberChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  if (isLoading && !isSuccess) {
    return <Spin size="large" />;
  }

  if (isSuccess && !articlesStore.articlesCount) {
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
        total={articlesStore.articlesCount}
        current={currentPage}
        showSizeChanger={false}
        simple
      />
      <ArticlesWrapper
        align="center"
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

export default UserFeed;
