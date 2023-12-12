import {Tag} from "antd";
import type {FC} from "react";
import type {PresetColorType} from "antd/lib/_util/colors";
import {useCallback} from "react";
import {observer} from "mobx-react-lite";

interface TagsListProps {
  readonly tags: string[];
  readonly tagsColor?: PresetColorType | "default"
  readonly onTagClick?: (tag: string) => void;
}

const TagsList: FC<TagsListProps> = observer(({
  tags,
  onTagClick,
  tagsColor = "default"
}) => {

  const handleOnClick = useCallback((tag: string) => {
    if (!onTagClick) {
      return;
    }
    return () => {
      onTagClick(tag);
    };
  }, [onTagClick]);

  return (
    <>
      {tags.map(tag =>
        <Tag
          color={tagsColor}
          key={tag}
          onClick={handleOnClick(tag)}
        >
          {tag}
        </Tag>
      )}
    </>
  );
});

export default TagsList;
