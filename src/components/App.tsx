import ArticleCard from "./ArticleCard.tsx";
import {mockDataArticles} from "../../mockData/mockArticles.ts";

function App() {
    return (
        <>
          <ArticleCard {...mockDataArticles[0]} />
        </>
    )
}

export default App
