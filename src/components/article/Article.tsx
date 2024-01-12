import {Flex, Spin, Typography, notification} from "antd";
import {useCallback, useEffect, useState} from "react";
import articlesStore from "../../store/ArticlesStore.ts";
import profilesStore from "../../store/ProfilesStore.ts";
import TagsList from "../TagsList.tsx";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import ArticleInteraction from "./ArticleInteraction.tsx";
import ArticleAuthor from "./ArticleAuthor.tsx";
import {useUnit} from "effector-react";
import usersStore from "../../store/UsersStore.ts";
import {useFavoriteError} from "../../hooks/useFavoriteError.ts";
import {Routes} from "../router/routes.tsx";
import {useFollowError} from "../../hooks/useFollowError.ts";

const {Title, Paragraph} = Typography;

const Article = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const article = useUnit(articlesStore.currentArticle);
  const profile = useUnit(profilesStore.profile);
  const isUserAuth = useUnit(usersStore.isUserAuth);

  const navigate = useNavigate();
  const path = useLocation().pathname.split("/");
  const slug = path[path.length - 1];

  useEffect(() => {
    setIsLoading(true);
    articlesStore
      .getOneArticle(slug)
      .then((articleData) => {
        profilesStore
          .fetchUserProfile(articleData.author.username)
          .then(() => setIsSuccess(true))
          .catch((error: Error) => notification.error({message: error.message}))
          .finally(() => setIsLoading(false));
      })
      .catch((error: Error) => notification.error({message: error.message}));

    return () => {
      setIsSuccess(false);
      articlesStore.currentArticleDefaulted();
      profilesStore.profileChanged(null);
    };
  }, [slug]);

  useFavoriteError();
  useFollowError();

  const handleOnFavoriteClick = useCallback(() => {
    if (!isUserAuth) {
      navigate(Routes.AUTHORIZATION);
      return;
    }
    articlesStore.toggleFavoriteArticle(slug);
  }, [isUserAuth, navigate, slug]);

  const handleOnFollowClick = useCallback(() => {
    if (!isUserAuth) {
      navigate(Routes.AUTHORIZATION);
      return;
    }
    profilesStore.toggleFollowUserProfile(article!.author.username);
  }, [article, isUserAuth, navigate]);

  if (isLoading || !isSuccess) {
    return (
      <Flex
        align="center"
        justify="center"
        vertical
      >
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      vertical
    >
      <TitleWrapper>
        <Title>
          {article!.title}
        </Title>
      </TitleWrapper>

      <Flex
        align="center"
        gap="small"
        justify="space-evenly"
        wrap="wrap"
      >
        <ArticleAuthor
          authorName={profile!.username}
          profileImg={profile!.image}
        />
        <ArticleInteraction
          onFavoriteClick={handleOnFavoriteClick}
          onFollowClick={handleOnFollowClick}
          createdAt={article!.createdAt}
          isFavorited={article!.favorited}
          isFollowed={profile!.following}
        />
      </Flex>
      <StyledHr />

      <StyledParagraph>
        {article!.body}
      </StyledParagraph>

      <Flex>
        <TagsList tags={article!.tagList} />
      </Flex>
    </Flex>
  );
};

const TitleWrapper = styled.div`
  text-align: center;
  width: 100vw;
  padding: 20px 0;
  margin-bottom: 20px;
  background-image: linear-gradient(195deg,
  #ffa800 0,
  #ff9700 8.33%,
  #ff8400 16.67%,
  #ff6d00 25%,
  #ff551e 33.33%,
  #fe382c 41.67%,
  #e80d33 50%,
  #d00037 58.33%,
  #ba003b 66.67%,
  #a6003f 75%,
  #950043 83.33%,
  #860048 91.67%,
  #78004f 100%);

  & > h1 {
    color: white;
  }
`;

const StyledHr = styled.hr`
  margin: 15px 0;
  width: 200px;
`;

const StyledParagraph = styled(Paragraph)`
  background-color: white;
  max-width: 1200px;
  min-width: 220px;
  font-size: 1rem;
  margin: 10px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(34, 60, 80, 0.2);

  @media (max-width: 320px) {
    box-shadow: none;
    padding: 10px 5px;
  }
`;

export default Article;