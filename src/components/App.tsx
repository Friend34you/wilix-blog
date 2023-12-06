import ArticleCard from "./ArticleCard.tsx";
import {mockDataArticles} from "../../mockData/mockArticles.ts";
import TagsCloud from "./TagsCloud.tsx";
import {mockDataTags} from "../../mockData/mockDataTags.ts";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import article from "../store/article.ts";
import {useEffect, useState} from "react";

const App = observer(() => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    article.getArticles()
      .then((response) => response)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    article.getOneArticle("123-jgaqif")
  }, []);


  if (loading) {
    return <h1>Loading...</h1>
  }
  /*
  setLoading(true)
  articleStore
    .fetchPost(1233)
    .then(setPost)
    .catch(e => showToast(e))
    .finally(() => setLoading(false))
  */
  return (
    <Flex align="center" vertical={true}>
      <TagsCloud tags={mockDataTags.tags}/>
      <div>
        {article.articles.map(articleItem =>
          <ArticleCard
            key={articleItem.slug}
            {...articleItem}
            onFavoriteClick={() => {
              console.log(mockDataArticles[0].slug)
            }}
          />
        )}
      </div>
    </Flex>
  )
})

export default App
