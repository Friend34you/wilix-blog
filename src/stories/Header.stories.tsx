import type {Meta, StoryObj} from "@storybook/react";
import {withRouter} from "storybook-addon-react-router-v6";
import AppHeader from "../components/header/AppHeader.tsx";
import {rest} from "msw";
import usersStore from "../store/UsersStore.ts";

const meta: Meta<typeof AppHeader> = {
  title: "AppHeader",
  component: AppHeader,
  decorators: [withRouter]
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const Unauthorized: Story = {
  loaders: [
    async () => usersStore.logoutUser()
  ],
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/users/login', (_, res, ctx) => {
          return res(
            ctx.json({})
          );
        }),
      ]
    },
  }
};

export const Authorized: Story = {
  loaders: [
    async () => usersStore.loginUser(
      {
        email: import.meta.env.VITE_TEST_LOGIN,
        password: import.meta.env.VITE_TEST_PASSWORD
      }
    )
  ],
  parameters: {
    msw: {
      handlers: [
        rest.post('http://localhost:3000/api/users/login', (_, res, ctx) => {
          return res(
            ctx.json({
              user: {
                username: "test",
                email: "emil",
                token: "token"
              }
            })
          );
        }),
      ]
    },
  }
};