import ArticleCard from "./ArticleCard.tsx";
import {mockDataArticles} from "../../mockData/mockArticles.ts";
import TagsCloud from "./TagsCloud.tsx";
import {mockDataTags} from "../../mockData/mockDataTags.ts";
import {Flex} from "antd";

const App = () => {
  return (
    <Flex align="center" vertical={true}>
      <TagsCloud tags={mockDataTags.tags}/>
      <div>
        <ArticleCard
          {...mockDataArticles[0]}
          onFavoriteClick={() => {
            console.log(mockDataArticles[0].slug)
          }}
        />
        <ArticleCard
          {...mockDataArticles[0]}
          onFavoriteClick={() => {
            console.log(mockDataArticles[0].slug)
          }}
        />
      </div>
    </Flex>
  )
}

export default App
