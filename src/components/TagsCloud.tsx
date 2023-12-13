import {Flex, Spin, Typography} from "antd";
import TagsList from "./TagsList.tsx";
import styled from "styled-components";
import tagsStore from "../store/tagsStore.ts";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

const StyledFlex = styled(Flex)`
  padding: 10px;
  max-width: 350px;
  border: 1px solid cornflowerblue;
  border-radius: 4px;

  & > * {
    margin: 4px 2px;
  }
`;

const StyledWrapper = styled.div`
  position: absolute;
  right: 5vw;
  top: 5vh;
  padding: 5px;

  @media (max-width: 1024px) {
    display: block;
    position: static;
  }
`;

const {Title} = Typography;

const TagsCloud = observer(() => {
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tagsError, setTagsError] = useState<Error | null>(null);

  useEffect(() => {
    setTagsLoading(true);
    tagsStore
      .fetchTags()
      .catch(setTagsError)
      .finally(() => setTagsLoading(false));
  }, []);

  const handleOnTagClick = (tag: string) => {
    tagsStore.selectedTag = tag;
  };

  return (
    <StyledWrapper>
      <Title level={4}>
        Popular tags
      </Title>
      <StyledFlex
        justify="space-evenly"
        wrap="wrap"
      >
        {tagsLoading && (
          <Spin/>
        )}
        {tagsError && (
          <p>{tagsError.message}</p>
        )}
        <TagsList
          onTagClick={handleOnTagClick}
          tags={tagsStore.tags}
          tagsColor="blue"
        />
      </StyledFlex>
    </StyledWrapper>
  );
});

export default TagsCloud;
