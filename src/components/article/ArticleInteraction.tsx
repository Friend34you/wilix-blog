import type {FC} from "react";
import {CheckOutlined, HeartOutlined, StarOutlined} from "@ant-design/icons";
import {Button, Typography} from "antd";
import {formatDate} from "../../helpers/formatDate.ts";
import styled from "styled-components";

type ArticleInteractionProps = {
  readonly createdAt: string,
  readonly onFollowClick: () => void,
  readonly onFavoriteClick: () => void,
  readonly isFavorited: boolean,
  readonly isFollowed: boolean,
}

const {Text} = Typography;

const ArticleInteraction: FC<ArticleInteractionProps> = ({
 createdAt,
 isFavorited,
 isFollowed,
 onFollowClick,
 onFavoriteClick,
}) => {
  return (
    <>
      <StyledDateText>
        {formatDate(createdAt)}
      </StyledDateText>

      <Button
        icon={isFollowed ? <CheckOutlined /> : <HeartOutlined />}
        type="primary"
        onClick={onFollowClick}
      >
        {isFollowed ? "followed" : "follow"}
      </Button>
      <Button
        icon={isFavorited ? <CheckOutlined /> : <StarOutlined />}
        onClick={onFavoriteClick}
      >
        {isFavorited ? "favorited" : "favorite"}
      </Button>
    </>
  );
};

const StyledDateText = styled(Text)`
  font-size: 12px;
`;

export default ArticleInteraction;