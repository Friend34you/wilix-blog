import ArticleCard from "./ArticleCard.tsx";
import {mockDataArticles} from "../../mockData/mockArticles.ts";
import TagsCloud from "./TagsCloud.tsx";
import {mockDataTags} from "../../mockData/mockDataTags.ts";
import {Layout} from "antd";

const {Content} = Layout

const App = () => {
  return (
    <Layout>
      <Content>
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
      </Content>

      <TagsCloud tags={mockDataTags.tags}/>

    </Layout>
  )
}

export default App
