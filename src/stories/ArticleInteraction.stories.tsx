import type {Meta, StoryObj} from "@storybook/react";
import {withRouter} from "storybook-addon-react-router-v6";
import ArticleInteraction from "../components/article/ArticleInteraction.tsx";
import {Flex} from "antd";

const meta: Meta<typeof ArticleInteraction> = {
  title: "ArticleInteraction",
  component: ArticleInteraction,
  tags: ['autodocs'],
  decorators: [withRouter]
};

export default meta;

type Story = StoryObj<typeof ArticleInteraction>;

export const Default: Story = {
  args: {
    createdAt: "2024-01-11T10:10:54.059Z",
    isFavorited: true,
    isFollowed: true,
  },
  render: (args) => (
    <Flex
      gap="small"
      justify="center"
      align="center"
    >
      <ArticleInteraction {...args}/>
    </Flex>
  )
};