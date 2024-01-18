import type {Meta, StoryObj} from "@storybook/react";
import NewArticle from "../components/NewArticle.tsx";

const meta: Meta<typeof NewArticle> = {
  title: "NewArticle",
  component: NewArticle,
};

export default meta;

type Story = StoryObj<typeof NewArticle>;

export const Default: Story = {};