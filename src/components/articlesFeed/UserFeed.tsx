import type { PaginationProps} from "antd";
import {Divider, notification, Pagination, Spin} from "antd";
import articlesStore from "../../store/ArticlesStore.ts";
import {ArticlesWrapper, EmptyBlock} from "./StyledFeedCommon.ts";
import ArticleCard from "../ArticleCard.tsx";
import {useUserFeed} from "./useUserFeed.ts";
import {useEffect} from "react";
import {useUnit} from "effector-react";

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
  const handleOnFavoriteClick = (slug: string) => {
    return () => articlesStore.toggleFavoriteArticle(slug);
  };

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
