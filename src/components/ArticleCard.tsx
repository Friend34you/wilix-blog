import type {FC} from "react";
import { useMemo} from "react";
import {Avatar, Button, Card, Flex, Space, Typography} from "antd";
import {CheckOutlined, StarOutlined} from "@ant-design/icons";
import styled from "styled-components";
import type {IArticle} from "../types/articleType.ts";
import {formatDate} from "../helpers/formatDate.ts";
import TagsList from "./TagsList.tsx";
import {Link} from "react-router-dom";

interface ArticleCardProps extends IArticle{
  //Пока не знаю как конкретно будет реализована эта функция
  readonly onFavoriteClick: () => void
}

type favoriteButtonPropsType = {
  type: "default" | "primary",
  icon: React.ReactNode,
}

const {Text, Title} = Typography;

const StyledCard = styled(Card)`
  margin: 40px 5px;
  max-width: 600px;
  box-shadow: 0px 4px 6px -1px rgba(34, 60, 80, 0.2);
`;

const StyledDateText = styled(Text)`
  font-size: 12px;
`;

const ArticleCard: FC<ArticleCardProps> = ({
  createdAt,
  description,
  title,
  updatedAt,
  author,
  tagList,
  favoritesCount,
  favorited,
  onFavoriteClick,
  slug
}) => {

  const favoriteButtonProps = useMemo((): favoriteButtonPropsType => {
    if (favorited) {
      return {
        type: "default",
        icon: <CheckOutlined />
      };
    }
    return {
      type: "primary",
      icon: <StarOutlined />
    };
  }, [favorited]);

  return (
    <StyledCard hoverable>
      <Flex
        align="center"
        justify="space-between"
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
          {...favoriteButtonProps}
        >
          {favoritesCount}
        </Button>
      </Flex>

      <Link
        state={slug}
        to={"/articles/" + slug}
      >
        <Title level={4}>
          {title}
        </Title>
        <Text>
          {description}
        </Text>
      </Link>

      <hr/>

      <Flex
        justify="end"
        wrap="wrap"
      >
        <TagsList tags={tagList} />
      </Flex>
    </StyledCard>
  );
};

export default ArticleCard;
