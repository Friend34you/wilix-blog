import type {Meta, StoryObj} from "@storybook/react";
import TagsCloud from "../components/TagsCloud.tsx";
import {rest} from "msw";

const meta: Meta<typeof TagsCloud> = {
  title: "TagsCloud",
  component: TagsCloud,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TagsCloud>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/tags', (_, res, ctx) => {
          return res(
            ctx.json({
              tags: ["tag1", "msw tag"]
            })
          );
        }),
      ]
    },
  }
};