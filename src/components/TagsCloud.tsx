import {Flex, Typography} from "antd";
import TagsList from "./TagsList.tsx";
import type {FC} from "react";
import styled from "styled-components";

interface TagsCloudProps {
  readonly tags: string[]
}

const StyledFlex = styled(Flex)`
  padding: 10px;
  max-width: 300px;
  border: 1px solid cornflowerblue;
  border-radius: 4px;

  & > * {
    margin: 4px 2px;
  }
`
const StyledWrapper= styled.div`
  position: absolute;
  right: 10vw;
  top: 10vh;
`

const {Title} = Typography

const TagsCloud: FC<TagsCloudProps> = ({tags}) => {
  // TODO:  разобраться с пробросом функции
  //  для получения отфильтрованных статей по тегу
  //  (функция будет из стора и на вход будет принимать строку(теш для запроса на сервер))
  return (
    <StyledWrapper>
      <Title level={4}>
        Popular tags
      </Title>
      <StyledFlex
        justify="space-evenly"
        wrap="wrap"
      >
        <TagsList
          tags={tags}
          tagsColor="blue"
        />
      </StyledFlex>
    </StyledWrapper>
  );
};

export default TagsCloud;
