import ArticleCard from "./ArticleCard.tsx";
import {mockDataArticles} from "../../mockData/mockArticles.ts";
import TagsCloud from "./TagsCloud.tsx";
import {mockDataTags} from "../../mockData/mockDataTags.ts";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import article from "../store/article.ts";
import {useEffect} from "react";

const App = observer(() => {

  useEffect(() => {
    article.getArticles()
  }, []);

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
