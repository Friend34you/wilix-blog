import {FC} from "react";
import {Avatar, Button, Card, Flex, Space, Tag, Typography} from "antd";
import styled from "styled-components";
import {IArticle} from "../types/articleType.ts";
import {formatDate} from "../helpers/formatDate.ts";

const {Text, Title} = Typography

const StyledCard = styled(Card)`
  max-width: 600px;
  box-shadow: 0px 4px 6px -1px rgba(34, 60, 80, 0.2);
`

const ArticleCard: FC<IArticle> = ({
                                     createdAt,
                                     description,
                                     title,
                                     updatedAt,
                                     author,
                                     tagList,
                                     favoritesCount
                                   }) => {

  return (
    <StyledCard hoverable>
      <Space
        align={"center"}
      >
        <Avatar>
          {author.username.charAt(0)}
        </Avatar>
        <Text>
          {author.username}
        </Text>
        <Text>
          created: {formatDate(createdAt)}
        </Text>
        <Text>
          edited: {formatDate(updatedAt)}
        </Text>
        <Button type={"primary"}>
          {favoritesCount}
        </Button>
      </Space>

      <Title level={3}>
        {title}
      </Title>
      <Text>
        {description}
      </Text>

      <hr/>

      <Flex justify={"end"}>
        {tagList.map(tag => <Tag>{tag}</Tag>)}
      </Flex>
    </StyledCard>
  );
};

export default ArticleCard;
