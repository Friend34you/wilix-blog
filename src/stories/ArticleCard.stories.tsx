import ArticleCard from "../components/ArticleCard.tsx";
import type {Meta, StoryObj} from "@storybook/react";
import {withRouter} from "storybook-addon-react-router-v6";

const meta: Meta<typeof ArticleCard> = {
  title: "ArticleCard",
  component: ArticleCard,
  tags: ['autodocs'],
  decorators: [withRouter]
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
    createdAt: "2024-01-11T10:10:54.059Z",
    updatedAt: "2024-01-11T10:10:54.059Z",
    favorited: true,
    favoritesCount: 2,
    slug: "Test-title-slug",
  }
};