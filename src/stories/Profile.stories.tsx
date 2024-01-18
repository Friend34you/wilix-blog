import type {Meta, StoryObj} from "@storybook/react";
import {withRouter} from "storybook-addon-react-router-v6";
import {rest} from "msw";
import Profile from "../components/profile/Profile.tsx";
import {article} from "./stories-mock-data/article.ts";

const meta: Meta<typeof Profile> = {
  title: "Profile",
  component: Profile,
  decorators: [withRouter]
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/articles?limit=10&offset=0&author=*', (_, res, ctx) => {
          return res(
            ctx.json(article)
          );
        }),
        rest.get('http://localhost:3000/api/profiles/*', (_, res, ctx) => {
          return res(
            ctx.json({
              profile: {
                "username": "test",
                "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
                "following": false
              }
            })
          );
        }),
      ]
    },
  }
};

export const ArticlesError: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/articles?limit=10&offset=0&author=*', (_, res, ctx) => {
          return res(
            ctx.status(500)
          );
        }),
        rest.get('http://localhost:3000/api/profiles/*', (_, res, ctx) => {
          return res(
            ctx.json({
              profile: {
                "username": "test",
                "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
                "following": false
              }
            })
          );
        }),
      ]
    },
  }
};

export const ProfileError: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/articles?limit=10&offset=0&author=*', (_, res, ctx) => {
          return res(
            ctx.json(article)
          );
        }),
        rest.get('http://localhost:3000/api/profiles/*', (_, res, ctx) => {
          return res(
            ctx.status(500)
          );
        }),
      ]
    },
  }
};