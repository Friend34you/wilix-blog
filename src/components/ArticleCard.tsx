import {FC, useMemo} from "react";
import {Avatar, Button, Card, Flex, Space, Tag, Typography} from "antd";
import {CheckOutlined, StarOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {IArticle} from "../types/articleType.ts";
import {formatDate} from "../helpers/formatDate.ts";

interface ArticleCardProps extends IArticle{
  //Пока не знаю как конкретно будет реализована эта функция
  onFavoriteClick: () => void
}

type followButtonPropsType = {
  type: "default" | "primary",
  icon: React.ReactNode,
}

const {Text, Title} = Typography

const StyledCard = styled(Card)`
  margin: 40px 5px;
  max-width: 600px;
  box-shadow: 0px 4px 6px -1px rgba(34, 60, 80, 0.2);
`

const StyledDateText = styled(Text)`
  font-size: 12px;
`

const ArticleCard: FC<ArticleCardProps> = ({
  createdAt,
  description,
  title,
  updatedAt,
  author,
  tagList,
  favoritesCount,
  favorited,
  onFavoriteClick
}) => {

  const followButtonProps = useMemo((): followButtonPropsType => {
    return favorited
      ? {
          type: "default",
          icon: <CheckOutlined />
        }
      : {
          type: "primary",
          icon: <StarOutlined />
        }
  }, [favorited])

  //В будущем необходимо будет добавить <Navigate> из react-router
  return (
    <StyledCard hoverable>
      <Flex
        justify={"space-between"}
        align={"center"}
      >
        <Space>
          <Avatar src={author.image}>
            {author.username.charAt(0)}
          </Avatar>
          <Text>
            {author.username}
          </Text>
          <Flex vertical={true}>
            <StyledDateText>
              created: {formatDate(createdAt)}
            </StyledDateText>
            <StyledDateText>
              edited: {formatDate(updatedAt)}
            </StyledDateText>
          </Flex>
        </Space>
        <Button
          onClick={onFavoriteClick}
          {...followButtonProps}
        >
          {favoritesCount}
        </Button>
      </Flex>

      <Title level={4}>
        {title}
      </Title>
      <Text>
        {description}
      </Text>

      <hr/>

      <Flex justify={"end"} wrap={"wrap"}>
        {tagList.map((tag, index) =>
          <Tag key={index}>{tag}</Tag>)}
      </Flex>
    </StyledCard>
  );
};

export default ArticleCard;
