import {Tag} from "antd";
import type {FC} from "react";
import type {PresetColorType} from "antd/lib/_util/colors";

interface TagsListProps {
  readonly tags: string[];
  readonly tagsColor: PresetColorType | "default"
  readonly onTagClick?: (tag: string) => () => void;
}

const TagsList: FC<TagsListProps> = ({
  tags,
  onTagClick,
  tagsColor
}) => {

  return (
    <>
      {tags.map(tag =>
        <Tag
          color={tagsColor}
          key={tag}
          onClick={onTagClick ? onTagClick(tag) : undefined}
        >
          {tag}
        </Tag>
      )}
    </>
  );
};

export default TagsList;
