import type {FC} from "react";
import { useMemo} from "react";
import {Avatar, Button, Card, Flex, Space, Typography} from "antd";
import {CheckOutlined, StarOutlined} from "@ant-design/icons";
import styled from "styled-components";
import type {IArticle} from "../types/articleType.ts";
import {formatDate} from "../helpers/formatDate.ts";
import TagsList from "./TagsList.tsx";
import {Link} from "react-router-dom";

import {Routes} from "./router/routesPaths.ts";

interface ArticleCardProps extends IArticle{
  //Пока не знаю как конкретно будет реализована эта функция
  readonly onFavoriteClick: () => void
}

type favoriteButtonPropsType = {
  type: "default" | "primary",
  icon: React.ReactNode,
}

const {Text, Title} = Typography;

const ArticleCard: FC<ArticleCardProps> = ({
  createdAt,
  description,
  title,
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
          <Link to={Routes.CURRENT_PROFILE + author.username}>
            <Avatar src={author.image}>
              {author.username.charAt(0)}
            </Avatar>
            <Text>
              {author.username}
            </Text>
          </Link>
          <StyledDateText>
            {formatDate(createdAt)}
          </StyledDateText>
        </Space>
        <Button
          onClick={onFavoriteClick}
          {...favoriteButtonProps}
        >
          {favoritesCount}
        </Button>
      </Flex>

      <Link
        to={"/articles/" + slug}
      >
        <StyledTitle level={4}>
          {title}
        </StyledTitle>
        <StyledDescriptionText>
          {description}
        </StyledDescriptionText>
      </Link>

      <hr/>

      <TagsWrapper justify="end">
        <TagsList tags={tagList} />
      </TagsWrapper>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  margin: 20px 5px;
  width: 425px;
  height: 260px;
  box-shadow: 0 4px 6px -1px rgba(34, 60, 80, 0.2);
  
  @media(max-width: 425px) {
    width: 100vw;
    margin: 15px 0;
  }
`;

const StyledDateText = styled(Text)`
  font-size: 12px;
`;

const StyledTitle = styled(Title)`
  height: 30px;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDescriptionText = styled(Text)`
  height: 50px;
  display: block;
  overflow: scroll;
  font-size: 12px;
`;

const TagsWrapper = styled(Flex)`
  height: 34px;
  display: block;
  overflow: scroll;
  white-space: nowrap;
`;

export default ArticleCard;
