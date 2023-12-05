import {Tag} from "antd";
import type {FC} from "react";
import type {PresetColorType} from "antd/lib/_util/colors";

interface TagsListProps {
  readonly tags: string[];
  readonly tagsColor: PresetColorType | "default"
  //поправлю как точно буду знать передаваемые данные
  readonly onTagClick?: () => void;
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
          onClick={onTagClick}
        >
          {tag}
        </Tag>
      )}
    </>
  );
};

export default TagsList;
