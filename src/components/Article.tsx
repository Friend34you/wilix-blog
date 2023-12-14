import {Avatar, Button, Flex, Spin, Typography} from "antd";
import {useEffect, useMemo, useState} from "react";
import articlesStore from "../store/articlesStore.ts";
import TagsList from "./TagsList.tsx";
import styled from "styled-components";
import {formatDate} from "../helpers/formatDate.ts";
import {CheckOutlined, HeartOutlined, StarOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";

const {Title, Paragraph, Text} = Typography;

const TitleWrapper = styled.div`
  text-align: center;
  width: 100vw;
  padding: 20px 0;
  margin-bottom: 20px;
  background-image: linear-gradient(
    195deg, 
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
    #78004f 100%
  );
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
  font-size: 1rem;
  margin: 10px;
  padding: 10px;
`;

const Article = observer(() => {
  //Добавить useLocation, для получения slug для подгрузки контента странмцы
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const FollowButtonProps = useMemo(() => {
    if (articlesStore.currentArticle?.author.following) {
      return {
        icon: <CheckOutlined />,
        text: "followed"
      };
    }
    return {
      icon: <HeartOutlined />,
      text: "follow"
    };
  }, []);

  const FavoriteButtonProps = useMemo(() => {
    if (articlesStore.currentArticle?.favorited) {
      return {
        icon: <CheckOutlined />,
        text: "favorited"
      };
    }
    return {
      icon: <StarOutlined />,
      text: "favorite"
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    articlesStore
      .getOneArticle("how-to-work-on-backend-fg2nwy")
      .then(() => {
        setSuccess(true);
        setError(null);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  //TODO: добавить роутовскую ссылку вместо обычной
  return (
    <Flex align="center" vertical>
      {loading && (
        <Spin size="large" />
      )}
      {error && (
        <p>{error.message}</p>
      )}
      {success && (
        <>
          <TitleWrapper>
            <Title>
              {articlesStore.currentArticle!.title}
            </Title>
          </TitleWrapper>

          <Flex
            align="center"
            gap="small"
            justify="space-evenly"
            wrap="wrap"
          >
           <a>
            <Flex
              align="center"
              gap="small"
            >
              <Avatar src={articlesStore.currentArticle!.author.image}>
                {articlesStore.currentArticle!.author.username.charAt(0)}
              </Avatar>
              <Text>
                {articlesStore.currentArticle!.author.username}
              </Text>
            </Flex>
           </a>
            <Flex vertical={true}>
              <StyledDateText>
                created: {formatDate(articlesStore.currentArticle!.createdAt)}
              </StyledDateText>
              <StyledDateText>
                edited: {formatDate(articlesStore.currentArticle!.updatedAt)}
              </StyledDateText>
            </Flex>
            <Button
              icon={FollowButtonProps.icon}
              type="primary"
            >
              {FollowButtonProps.text}
            </Button>
            <Button icon={FavoriteButtonProps.icon}>
              {FavoriteButtonProps.text}
            </Button>
          </Flex>

          <StyledHr />

          <StyledParagraph>
            {articlesStore.currentArticle!.body}
          </StyledParagraph>

          <Flex>
            <TagsList tags={articlesStore.currentArticle!.tagList} />
          </Flex>
        </>
      )}
  </Flex>
  );
});

export default Article;