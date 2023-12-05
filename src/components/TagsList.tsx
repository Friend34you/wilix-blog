import {Tag} from "antd";
import {FC} from "react";
import {PresetColorType} from "antd/lib/_util/colors";

interface TagsListProps {
  tags: string[];
  onTagClick?: () => void;
  tagsColor: PresetColorType | "default"
}

const TagsList:FC<TagsListProps> = ({
  tags,
  onTagClick,
  tagsColor
}) => {

  const tagItems = tags.map(tag =>
    <Tag
      key={tag}
      onClick={onTagClick}
      color={tagsColor}
    >
      {tag}
    </Tag>
  )

  return (
    <>
      {tagItems}
    </>
  );
};

export default TagsList;
