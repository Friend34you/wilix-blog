import {Tag} from "antd";
import type {FC} from "react";
import type {PresetColorType} from "antd/lib/_util/colors";
import {useCallback} from "react";
import {observer} from "mobx-react-lite";

interface TagsListProps {
  readonly tags: string[];
  readonly tagsColor?: PresetColorType | "default"
  readonly onTagClick?: (tag: string) => void;
  readonly onTagClose?: (removedTag: string) => void;
  readonly closable?: boolean
}

const TagsList: FC<TagsListProps> = observer(({
  tags,
  onTagClick,
  tagsColor = "default",
  closable = false,
  onTagClose
}) => {
  const handleOnClick = useCallback((tag: string) => {
    if (!onTagClick) {
      return;
    }
    return () => {
      onTagClick(tag);
    };
  }, [onTagClick]);

  const handleOnClose = useCallback((removedTag: string) => {
    if (!onTagClose) {
      return;
    }
    return () => {
      onTagClose(removedTag);
    };
  }, [onTagClose]);

  return (
    <>
      {tags.map(tag =>
        <Tag
          color={tagsColor}
          key={tag}
          closable={closable}
          onClick={handleOnClick(tag)}
          onClose={handleOnClose(tag)}
        >
          {tag}
        </Tag>
      )}
    </>
  );
});

export default TagsList;
