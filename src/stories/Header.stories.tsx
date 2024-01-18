import type {Meta, StoryObj} from "@storybook/react";
import {withRouter} from "storybook-addon-react-router-v6";
import AppHeader from "../components/header/AppHeader.tsx";
import {rest} from "msw";

const meta: Meta<typeof AppHeader> = {
  title: "AppHeader",
  component: AppHeader,
  tags: ['autodocs'],

  decorators: [withRouter]
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const Unauthorized: Story = {

  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/user', (_, res, ctx) => {
          return res(
            ctx.json({
            })
          );
        }),
      ]
    },
  }
};

// export const Authorized: Story = {
//
//   parameters: {
//     msw: {
//       handlers: [
//         rest.get('http://localhost:3000/api/user', (_, res, ctx) => {
//           return res(
//             ctx.json({
//               user: {
//                 username: "blakuto",
//                 email: "test@test.test",
//                 token: "token"
//               }
//             })
//           );
//         }),
//       ]
//     },
//   }
// };