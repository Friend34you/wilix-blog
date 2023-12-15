import {Avatar, Button, Flex, Spin, Typography, notification} from "antd";
import type {FC, ReactNode} from "react";
import {useEffect, useMemo, useState} from "react";
import articlesStore from "../../store/articlesStore.ts";
import TagsList from "../TagsList.tsx";
import styled from "styled-components";
import {formatDate} from "../../helpers/formatDate.ts";
import {observer} from "mobx-react-lite";
import profilesStore from "../../store/profilesStore.ts";
import {Link, useLocation} from "react-router-dom";
import {Routes} from "../router/routes.tsx";
import {CheckOutlined, HeartOutlined, StarOutlined} from "@ant-design/icons";

const {Title, Paragraph, Text} = Typography;

type ArticleInteractionProps = {
  readonly createdAt: string,
  readonly updatedAt: string,
  readonly onFollowClick: () => void,
  readonly onFavoriteClick: () => void,
  readonly isFavorited: boolean,
  readonly isFollowed: boolean,
}

type ArticleAuthorProps = {
  readonly authorName: string,
  readonly profileImg?: string
}

type ButtonPropsType = {
  text: string,
  icon: ReactNode,
}

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

const StyledDateText = styled(Text)`
  font-size: 12px;
`;

const StyledHr = styled.hr`
  margin: 15px 0;
  width: 200px;
`;

const StyledParagraph = styled(Paragraph)`
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

const StyledArticleAuthorFlex = styled(Flex)`
  &:hover {
    transform: scale(1.1);
    transition: 0.2s linear;
  }
`;

const Article = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const article = articlesStore.currentArticle!;

  const {state: slug} = useLocation();

  useEffect(() => {
    setIsLoading(true);
    articlesStore
      .getOneArticle(slug)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsLoading(false));

    return () => {
      setIsSuccess(false);
      articlesStore.currentArticle = null;
      //добавл get и set в стор для зануления тут
      profilesStore.profile = null;
    };
  }, [slug]);

  function handleOnFavoriteClick() {
    articlesStore
      .toggleFavoriteArticle(slug)
      .catch((error: Error) => notification.error({message: error.message}));
  }

  function handleOnFollowClick() {
    profilesStore
      .toggleFollowUserProfile(article.author.username)
      .then(() => {
        //не понимаю, как сделать лучше,т.к. сторы никак не связаны
        article.author.following = profilesStore.profile!.following;
      })
      .catch((error: Error) => notification.error({message: error.message}));
  }

  return (
    <Flex
      align="center"
      vertical
    >
      {isLoading && (
        <Spin size="large"/>
      )}
      {isSuccess && (
        <>
          <TitleWrapper>
            <Title>
              {article.title}
            </Title>
          </TitleWrapper>

          <Flex
            align="center"
            gap="small"
            justify="space-evenly"
            wrap="wrap"
          >
            <ArticleAuthor
              authorName={article.author.username}
              profileImg={article.author.image}
            />
            <ArticleInteraction
              onFavoriteClick={handleOnFavoriteClick}
              onFollowClick={handleOnFollowClick}
              updatedAt={article.updatedAt}
              createdAt={article.createdAt}
              isFavorited={article.favorited}
              isFollowed={article.author.following}
            />
          </Flex>
          <StyledHr/>

          <StyledParagraph>
            {article.body}
          </StyledParagraph>

          <Flex>
            <TagsList tags={article.tagList}/>
          </Flex>
        </>
      )}
    </Flex>
  );
});

const ArticleAuthor:FC<ArticleAuthorProps> = ({authorName, profileImg}) => {
  return (
    <Link
      state={authorName}
      to={Routes.CURRENT_PROFILE + authorName}
    >
      <StyledArticleAuthorFlex
        align="center"
        gap="small"
      >
        <Avatar src={profileImg}>
          {authorName.charAt(0)}
        </Avatar>
        <Text>
          {authorName}
        </Text>
      </StyledArticleAuthorFlex>
    </Link>
  );
};

const ArticleInteraction:FC<ArticleInteractionProps> = ({
  createdAt,
  updatedAt,
  isFavorited,
  isFollowed,
  onFollowClick,
  onFavoriteClick,
}) => {

  const followButtonProps = useMemo<ButtonPropsType>(() => {
    if (isFollowed) {
      return {
        icon: <CheckOutlined/>,
        text: "followed"
      };
    }
    return {
      icon: <HeartOutlined/>,
      text: "follow"
    };
  }, [isFollowed]);

  const favoriteButtonProps = useMemo<ButtonPropsType>(() => {
    if (isFavorited) {
      return {
        icon: <CheckOutlined/>,
        text: "favorited",
      };
    }
    return {
      icon: <StarOutlined/>,
      text: "favorite",
    };
    },[isFavorited]);

    return (
      <>
        <Flex vertical>
          <StyledDateText>
            created: {formatDate(createdAt)}
          </StyledDateText>
          <StyledDateText>
            edited: {formatDate(updatedAt)}
          </StyledDateText>
        </Flex>

        <Button
          icon={followButtonProps.icon}
          type="primary"
          onClick={onFollowClick}
        >
          {followButtonProps.text}
        </Button>
        <Button
          icon={favoriteButtonProps.icon}
          onClick={onFavoriteClick}
        >
          {favoriteButtonProps.text}
        </Button>
      </>
    );
  };

  export default Article;