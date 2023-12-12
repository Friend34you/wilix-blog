import ArticleCard from "./ArticleCard.tsx";
import TagsCloud from "./TagsCloud.tsx";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import articlesStore from "../store/articlesStore.ts";
import tagsStore from "../store/tagsStore.ts";

//Тестовый компонент где я тыкаюсь
const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  function testCreateArticle() {
    articlesStore
      .createArticle({
        body: "fdsdsfds",
        title: "gfgfdfgdf",
        tagList: ["gfgfddff"],
        description: "gfgfdgdgdfgdf"
      })
      .catch(setError);
  }

  useEffect(() => {
    setLoading(true);
    articlesStore
      .getArticles()
      .catch(setError)
      .finally(() => setLoading(false));

    tagsStore
      .getTags()
      .catch(setError);
  }, []);


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Flex align="center" vertical={true}>
      <TagsCloud
        setArticlesError={setError}
        setArticlesLoading={setLoading}
      />
      <button
        onClick={testCreateArticle}
        type="button"
      >
        Click
      </button>
      <div>
        {articlesStore.articles.map(articleItem =>
          <ArticleCard
            {...articleItem}
            key={articleItem.slug}
            onFavoriteClick={() => articlesStore.toggleFavoriteArticle(articleItem.slug)}
          />
        )}
      </div>
    </Flex>
  );
});

export default App;
