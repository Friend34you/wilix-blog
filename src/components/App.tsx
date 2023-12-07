import ArticleCard from "./ArticleCard.tsx";
import TagsCloud from "./TagsCloud.tsx";
import {mockDataTags} from "../../mockData/mockDataTags.ts";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import { useEffect, useState} from "react";
import ArticleStore from "../store/ArticleStore.ts";

//Тестовый компонент где я тыкаюсь
const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    ArticleStore.getArticles(10, 0)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Flex align="center" vertical={true}>
      <TagsCloud tags={mockDataTags.tags}/>
      <button onClick={() => ArticleStore.createArticle({body: "fdsdsfds", title: "gfgfdfgdf", tagList: ["gfgfddff"], description: "gfgfdgdgdfgdf"})} type="button">Click</button>
      <div>
        {ArticleStore.articles.map(articleItem =>
          <ArticleCard
            key={articleItem.slug}
            {...articleItem}
            onFavoriteClick={() => ArticleStore.toggleFavoriteArticle(articleItem.slug)}
          />
        )}
      </div>
    </Flex>
  );
});

export default App;
