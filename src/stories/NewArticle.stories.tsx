import type {Meta, StoryObj} from "@storybook/react";
import NewArticle from "../components/NewArticle.tsx";

//С этим компонентом я хз так как он из кусочков antd и по сути это страница целая
const meta: Meta<typeof NewArticle> = {
  title: "NewArticle",
  component: NewArticle,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NewArticle>;

export const Default: Story = {
};