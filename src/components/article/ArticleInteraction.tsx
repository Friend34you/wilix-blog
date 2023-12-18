import type {FC} from "react";
import {CheckOutlined, HeartOutlined, StarOutlined} from "@ant-design/icons";
import {Button, Flex, Typography} from "antd";
import {formatDate} from "../../helpers/formatDate.ts";
import styled from "styled-components";

type ArticleInteractionProps = {
  readonly createdAt: string,
  readonly updatedAt: string,
  readonly onFollowClick: () => void,
  readonly onFavoriteClick: () => void,
  readonly isFavorited: boolean,
  readonly isFollowed: boolean,
}

const {Text} = Typography;

const ArticleInteraction: FC<ArticleInteractionProps> = ({
 createdAt,
 updatedAt,
 isFavorited,
 isFollowed,
 onFollowClick,
 onFavoriteClick,
}) => {
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