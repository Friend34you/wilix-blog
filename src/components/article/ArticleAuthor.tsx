import type {FC} from "react";
import {Link} from "react-router-dom";
import {Routes} from "../router/routes.tsx";
import {Avatar, Flex, Typography} from "antd";
import styled from "styled-components";

type ArticleAuthorProps = {
  readonly authorName: string,
  readonly profileImg?: string
}

const {Text} = Typography;

const ArticleAuthor:FC<ArticleAuthorProps> = ({authorName, profileImg}) => {
  return (
    <Link to={Routes.CURRENT_PROFILE + authorName}>
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

const StyledArticleAuthorFlex = styled(Flex)`
  &:hover {
    transform: scale(1.1);
    transition: 0.2s linear;
  }
`;

export default ArticleAuthor;