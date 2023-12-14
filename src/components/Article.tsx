import {Avatar, Button, Flex, Spin, Typography} from "antd";
import {useEffect, useState} from "react";
import articlesStore from "../store/articlesStore.ts";
import TagsList from "./TagsList.tsx";
import styled from "styled-components";
import {formatDate} from "../helpers/formatDate.ts";

const {Title, Paragraph, Text} = Typography;

const TitleWrapper = styled.div`
  text-align: center;
  width: 100vw;
  padding: 10px 0;
  margin-bottom: 20px;
  background-image: linear-gradient(185deg, #ffa701 0, #ff9620 10%, #ff8430 20%, #ff703b 30%, #ff5c42 40%, #f94646 50%, #e43148 60%, #d01c4b 70%, #be044d 80%, #ae0050 90%, #9f0054 100%);
  
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
`;

const Article = () => {
  //Добавить useLocation, для получения slug для подгрузки контента странмцы

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
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
              <Flex vertical={true}>
                <StyledDateText>
                  created: {formatDate(articlesStore.currentArticle!.createdAt)}
                </StyledDateText>
                <StyledDateText>
                  edited: {formatDate(articlesStore.currentArticle!.updatedAt)}
                </StyledDateText>
              </Flex>
            </Flex>
           </a>
            <Button type="primary">
              Follow Author
            </Button>
            <Button>
              Favorite Article
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
};

export default Article;