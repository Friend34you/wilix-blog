import ArticleCard from "./ArticleCard.tsx";
import TagsCloud from "./TagsCloud.tsx";
import {mockDataTags} from "../../mockData/mockDataTags.ts";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import article from "../store/article.ts";
import { useEffect, useState} from "react";

//Тестовый компонент где я тыкаюсь
const App = observer(() => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    article.getArticles()
      .then((response) => response)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
    article.getOneArticle("123-jgaqif")
      .then((response) => response)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <Flex align="center" vertical={true}>
      <TagsCloud tags={mockDataTags.tags}/>
      <div>
        {article.articles.map(articleItem =>
          <ArticleCard
            key={articleItem.slug}
            {...articleItem}
            onFavoriteClick={() => article.toggleFavoriteArticle(articleItem.slug)}
          />
        )}
      </div>
    </Flex>
  )
})

export default App
