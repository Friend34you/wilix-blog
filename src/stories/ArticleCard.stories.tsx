import ArticleCard from "../components/ArticleCard.tsx";
import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof ArticleCard> = {
  title: "ArticleCard",
  component: ArticleCard,
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    author: {
      bio: null,
      image: "img",
      username: "testUser"
    },
    tagList: ["tag1", "tag2"],
    title: "Test title",
    description: "Test description",
    createdAt: "23.03.2023",
    updatedAt: "23.03.2023",
    favorited: true,
    favoritesCount: 2,
    slug: "Test-title-slug",
    // onFavoriteClick: () => console.log("click"),
  }
};