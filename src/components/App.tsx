import ArticleCard from "./ArticleCard.tsx";
import TagsCloud from "./TagsCloud.tsx";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import articlesStore from "../store/articlesStore.ts";
import tagsStore from "../store/tagsStore.ts";
import userStore from "../store/usersStore.ts";

function testLogout() {
  localStorage.removeItem("token");
  userStore.user = null;
}

//Тестовый компонент где я тыкаюсь
const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  function testLogin() {
    userStore
      .loginUser({
        email: "vovan23doni@gmail.com",
        password: "123456789v"
      })
      .catch(setError);
  }

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
      <TagsCloud tags={tagsStore.tags}/>
      <p>{userStore.user?.username}</p>
      <button
        onClick={testLogin}
        type="button"
      >
        LOGIN
      </button>
      <button onClick={testLogout} type="button">LOGOUT</button>

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
