import type {Meta, StoryObj} from "@storybook/react";
import {reactRouterOutlet, reactRouterParameters, withRouter} from "storybook-addon-react-router-v6";
import {rest} from "msw";
import Articles from "../components/articlesFeed/Articles.tsx";
import {Outlet} from "react-router-dom";
import {articlesFeed} from "./stories-mock-data/articles_feed.ts";

const meta: Meta<typeof Articles> = {
  title: "Articles",
  component: Articles,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(<Outlet />),
    }),
  },
};

export default meta;

type Story = StoryObj<typeof Articles>;

export const FeedUnauth: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/articles/*', (_, res, ctx) => {
          return res(
            ctx.json(articlesFeed)
          );
        }),
      ]
    },
  }
};
