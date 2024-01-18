import type {Meta, StoryObj} from "@storybook/react";
import {withRouter} from "storybook-addon-react-router-v6";
import Article from "../components/article/Article.tsx";
import {rest} from "msw";

const meta: Meta<typeof Article> = {
  title: "Article",
  component: Article,
  decorators: [withRouter]
};

export default meta;

type Story = StoryObj<typeof Article>;

const mockArticle = {
  "article": {
    "slug": "sereznyj-post-s-bolshim-zagolo-sy6p39",
    "title": "Серезный пост с большим заголо",
    "description": "Какое-то описание максимальной длины",
    "body": "Замокано",
    "createdAt": "2024-01-11T10:10:54.059Z",
    "updatedAt": "2024-01-12T09:28:33.523Z",
    "tagList": [
      "тег",
      "тег2",
      "тег3",
      "тег4",
      "тег5",
      "тег6",
      "тег7"
    ],
    "favorited": false,
    "favoritesCount": 1,
    "author": {
      "username": "blakuto",
      "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
      "following": false
    }
  }
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/articles/*', (_, res, ctx) => {
          return res(
            ctx.json(mockArticle)
          );
        }),
        rest.get('http://localhost:3000/api/profiles/*', (_, res, ctx) => {
          return res(
            ctx.json({
              profile: {
                "username": "blakuto",
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

export const ArticleError: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/articles/*', (_, res, ctx) => {
          return res(
            ctx.status(500)
          );
        }),
        rest.get('http://localhost:3000/api/profiles/*', (_, res, ctx) => {
          return res(
            ctx.json({
              profile: {
                "username": "blakuto",
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
        rest.get('http://localhost:3000/api/articles/*', (_, res, ctx) => {
          return res(
            ctx.json(mockArticle)
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