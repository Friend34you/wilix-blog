import ArticleCard from "./ArticleCard.tsx";
import TagsCloud from "./TagsCloud.tsx";
import {Flex} from "antd";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import ArticleStore from "../store/ArticleStore.ts";
import TagStore from "../store/TagStore.ts";
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
    ArticleStore
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
    ArticleStore
      .getArticles(10, 0)
      .catch(setError)
      .finally(() => setLoading(false));

    TagStore
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
      <TagsCloud tags={TagStore.tags}/>
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
        {ArticleStore.articles.map(articleItem =>
          <ArticleCard
            {...articleItem}
            key={articleItem.slug}
            onFavoriteClick={() => ArticleStore.toggleFavoriteArticle(articleItem.slug)}
          />
        )}
      </div>
    </Flex>
  );
});

export default App;
