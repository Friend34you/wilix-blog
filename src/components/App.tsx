import ArticleCard from "./ArticleCard.tsx";
import {mockDataArticles} from "../../mockData/mockArticles.ts";

function App() {
    return (
        <>
          <ArticleCard
            {...mockDataArticles[0]}
            onFavoriteClick={()=> {console.log(mockDataArticles[0].slug)}}
          />
        </>
    )
}

export default App
