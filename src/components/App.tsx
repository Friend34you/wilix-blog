import ArticleCard from "./ArticleCard.tsx";
import TagsCloud from "./TagsCloud.tsx";
import {Flex, Spin} from "antd";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import articlesStore from "../store/articlesStore.ts";
import usersStore from "../store/usersStore.ts";

function testLogout() {
  localStorage.removeItem("token");
  usersStore.user = null;
}

//Тестовый компонент где я тыкаюсь
const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  function testLogin() {
    usersStore
      .loginUser({
        email: import.meta.env.VITE_TEST_LOGIN,
        password: import.meta.env.VITE_TEST_PASSWORD
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

  }, []);

  return (
    <Flex align="center" vertical={true}>
      <TagsCloud />
      {usersStore.user && (
        <p>{usersStore.user.username}</p>
      )}
      <button
        onClick={testLogin}
        type="button"
      >
        LOGIN
      </button>
      <button
        onClick={testLogout}
        type="button"
      >
        LOGOUT
      </button>
      <button
        onClick={testCreateArticle}
        type="button"
      >
        Click
      </button>
      {error && (
        <h1>{error.message}</h1>
      )}
      {loading && (
        <Spin size="large" />
      )}
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
