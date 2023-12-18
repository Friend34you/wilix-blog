import type {FC, ReactNode} from "react";
import {CheckOutlined, HeartOutlined, StarOutlined} from "@ant-design/icons";
import {Button, Flex, Typography} from "antd";
import {formatDate} from "../../helpers/formatDate.ts";
import styled from "styled-components";

type ButtonPropsType = {
  text: string,
  icon: ReactNode,
}

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
  let followButtonProps: ButtonPropsType = {
    icon: <HeartOutlined/>,
    text: "follow"
  };
  if (isFollowed) {
    followButtonProps = {
      icon: <CheckOutlined/>,
      text: "followed"
    };
  }

  let favoriteButtonProps: ButtonPropsType = {
    icon: <StarOutlined/>,
    text: "favorite",
  };
  if (isFavorited) {
    favoriteButtonProps = {
      icon: <CheckOutlined/>,
      text: "favorited",
    };
  }

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

const StyledDateText = styled(Text)`
  font-size: 12px;
`;

export default ArticleInteraction;