import type {Meta, StoryObj} from "@storybook/react";
import {withRouter} from "storybook-addon-react-router-v6";
import ArticleAuthor from "../../components/article/ArticleAuthor.tsx";

const meta: Meta<typeof ArticleAuthor> = {
  title: "Article/ArticleAuthor",
  component: ArticleAuthor,
  tags: ['autodocs'],
  decorators: [withRouter]
};

export default meta;

type Story = StoryObj<typeof ArticleAuthor>;

export const Default: Story = {
  args: {
    authorName: "testUser",
    profileImg: "testUrl"
  }
};