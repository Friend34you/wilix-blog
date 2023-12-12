import {Flex, Spin, Typography} from "antd";
import TagsList from "./TagsList.tsx";
import styled from "styled-components";
import tagsStore from "../store/tagsStore.ts";
import type {Dispatch, FC, SetStateAction} from "react";
import { useEffect, useState} from "react";
import articlesStore from "../store/articlesStore.ts";


//насколько это неудачная идея? Хочется,чтобы при фильтрации по тегу и лоадер крутился, и ошибки показывались
interface TagsCloudProps {
  readonly setArticlesLoading: Dispatch<SetStateAction<boolean>>;
  readonly setArticlesError: Dispatch<SetStateAction<Error | null>>
}

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

const TagsCloud: FC<TagsCloudProps> = ({setArticlesLoading, setArticlesError}) => {
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tagsError, setTagsError] = useState<Error | null>(null);

  useEffect(() => {
    setTagsLoading(true);
    tagsStore
      .getTags()
      .catch(setTagsError)
      .finally(() => setTagsLoading(false));
  }, []);

  const handleOnTagClick = (tag: string) => {
    return () => {
      setArticlesLoading(true);
      articlesStore
        .getArticles(10, 0, tag)
        .catch(setArticlesError)
        .finally(() => setArticlesLoading(false));
    };
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
};

export default TagsCloud;
