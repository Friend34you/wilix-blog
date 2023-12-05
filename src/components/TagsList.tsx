import {Tag} from "antd";
import {FC} from "react";
import {PresetColorType} from "antd/lib/_util/colors";

interface TagsListProps {
  tags: string[];
  tagsColor: PresetColorType | "default"
  //поправлю как точно буду знать передаваемые данные
  onTagClick?: () => void;
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
          key={tag}
          onClick={onTagClick}
          color={tagsColor}
        >
          {tag}
        </Tag>
      )}
    </>
  );
};

export default TagsList;
