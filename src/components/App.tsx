import ArticleCard from "./ArticleCard.tsx";
import TagsCloud from "./TagsCloud.tsx";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import articleStore from "../store/articleStore.ts";
import tagStore from "../store/tagStore.ts";

//Тестовый компонент где я тыкаюсь
const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    articleStore
      .getArticles()
      .catch(setError)
      .finally(() => setLoading(false));

    tagStore
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
      <TagsCloud tags={tagStore.tags}/>
      <button onClick={() => articleStore.createArticle({
        body: "fdsdsfds",
        title: "gfgfdfgdf",
        tagList: ["gfgfddff"],
        description: "gfgfdgdgdfgdf"
      })} type="button">Click
      </button>
      <div>
        {articleStore.articles.map(articleItem =>
          <ArticleCard
            key={articleItem.slug}
            {...articleItem}
            onFavoriteClick={() => articleStore.toggleFavoriteArticle(articleItem.slug)}
          />
        )}
      </div>
    </Flex>
  );
});

export default App;
