import type {Meta, StoryObj} from "@storybook/react";
import {reactRouterOutlet, reactRouterParameters, withRouter} from "storybook-addon-react-router-v6";
import {rest} from "msw";
import Articles from "../components/articlesFeed/Articles.tsx";
import {Outlet} from "react-router-dom";

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

const mockArticles = {
  "articles": [
    {
      "slug": "big-text-to-test-hxl70y",
      "title": "BIG TEXT TO TEST",
      "description": "decription descr",
      "body": "#Hehe Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sem gravida, vulputate lorem quis, euismod neque. Morbi finibus efficitur sapien, eu convallis dui porttitor sed. Suspendisse potenti. Etiam ornare metus et magna maximus, nec semper purus dapibus. Nam tempor auctor mattis. Nulla lobortis leo in lectus placerat, ut vulputate diam tincidunt. Sed dictum ac nisl sit amet cursus. Etiam eu orci tempor, posuere risus sagittis, vehicula tortor. Integer neque ipsum, mollis vitae tempus ut, interdum in urna. In ultricies sem lectus, sit amet rhoncus lacus ultrices sed. Donec hendrerit lacus leo, ultrices tempus leo rutrum ut. Nunc vitae condimentum nunc, et posuere felis. Mauris sem orci, tincidunt eu semper sit amet, dapibus et tortor. Donec ipsum felis, pharetra quis lacus eget, viverra hendrerit nibh. Quisque pellentesque interdum viverra. Aliquam vulputate nunc nibh, nec placerat quam vestibulum id. Duis nisl turpis, consectetur in elit sit amet, vehicula lobortis ante. Donec eget rhoncus nulla. In nec odio eu enim mollis finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus tincidunt accumsan ex, id malesuada lectus. Nulla a egestas dui. Sed eu massa vel nunc sodales elementum. Vestibulum diam neque, cursus id nunc sed, dapibus mattis elit. Nulla sit amet viverra elit. Aliquam eu nulla ac sem luctus volutpat. Pellentesque feugiat ligula dolor, at venenatis nisl rutrum vitae. Duis varius dui efficitur ante mollis tempus. Phasellus volutpat quam sem, in dictum enim luctus vitae. Vestibulum luctus lectus congue lorem egestas, vel laoreet tellus mattis. Integer egestas eros a sodales gravida. Integer consectetur, libero eget volutpat elementum, lectus mauris malesuada ante, a malesuada sapien nisi eget leo. Morbi commodo justo vel nisi dictum pretium. Sed eu odio sollicitudin, egestas mi non, fermentum tellus. Aenean tempus, quam nec imperdiet viverra, justo tellus consequat lectus, sed venenatis diam neque sed velit. Nullam eros diam, laoreet ut porttitor ornare, porta vitae purus. Donec leo erat, tempus eget enim at, maximus porttitor metus. Donec pretium risus quis dui lobortis feugiat in quis erat. Maecenas dictum rutrum velit in consequat. Integer lectus elit, iaculis eu tristique blandit, rutrum eu diam. Donec dapibus id lorem vel finibus. Donec tincidunt leo id felis congue, vitae laoreet nisi consequat. Curabitur egestas elit ut pretium auctor. Integer sodales mi ac mi feugiat dignissim. Integer interdum, lacus sit amet aliquet ullamcorper, quam magna pulvinar nunc, eu gravida enim nisl id massa. Sed suscipit dictum nisl suscipit vestibulum. Vivamus eget nulla nunc.#Hehe Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sem gravida, vulputate lorem quis, euismod neque. Morbi finibus efficitur sapien, eu convallis dui porttitor sed. Suspendisse potenti. Etiam ornare metus et magna maximus, nec semper purus dapibus. Nam tempor auctor mattis. Nulla lobortis leo in lectus placerat, ut vulputate diam tincidunt. Sed dictum ac nisl sit amet cursus. Etiam eu orci tempor, posuere risus sagittis, vehicula tortor. Integer neque ipsum, mollis vitae tempus ut, interdum in urna. In ultricies sem lectus, sit amet rhoncus lacus ultrices sed. Donec hendrerit lacus leo, ultrices tempus leo rutrum ut. Nunc vitae condimentum nunc, et posuere felis. Mauris sem orci, tincidunt eu semper sit amet, dapibus et tortor. Donec ipsum felis, pharetra quis lacus eget, viverra hendrerit nibh. Quisque pellentesque interdum viverra. Aliquam vulputate nunc nibh, nec placerat quam vestibulum id. Duis nisl turpis, consectetur in elit sit amet, vehicula lobortis ante. Donec eget rhoncus nulla. In nec odio eu enim mollis finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus tincidunt accumsan ex, id malesuada lectus. Nulla a egestas dui. Sed eu massa vel nunc sodales elementum. Vestibulum diam neque, cursus id nunc sed, dapibus mattis elit. Nulla sit amet viverra elit. Aliquam eu nulla ac sem luctus volutpat. Pellentesque feugiat ligula dolor, at venenatis nisl rutrum vitae. Duis varius dui efficitur ante mollis tempus. Phasellus volutpat quam sem, in dictum enim luctus vitae. Vestibulum luctus lectus congue lorem egestas, vel laoreet tellus mattis. Integer egestas eros a sodales gravida. Integer consectetur, libero eget volutpat elementum, lectus mauris malesuada ante, a malesuada sapien nisi eget leo. Morbi commodo justo vel nisi dictum pretium. Sed eu odio sollicitudin, egestas mi non, fermentum tellus. Aenean tempus, quam nec imperdiet viverra, justo tellus consequat lectus, sed venenatis diam neque sed velit. Nullam eros diam, laoreet ut porttitor ornare, porta vitae purus. Donec leo erat, tempus eget enim at, maximus porttitor metus. Donec pretium risus quis dui lobortis feugiat in quis erat. Maecenas dictum rutrum velit in consequat. Integer lectus elit, iaculis eu tristique blandit, rutrum eu diam. Donec dapibus id lorem vel finibus. Donec tincidunt leo id felis congue, vitae laoreet nisi consequat. Curabitur egestas elit ut pretium auctor. Integer sodales mi ac mi feugiat dignissim. Integer interdum, lacus sit amet aliquet ullamcorper, quam magna pulvinar nunc, eu gravida enim nisl id massa. Sed suscipit dictum nisl suscipit vestibulum. Vivamus eget nulla nunc.#Hehe Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sem gravida, vulputate lorem quis, euismod neque. Morbi finibus efficitur sapien, eu convallis dui porttitor sed. Suspendisse potenti. Etiam ornare metus et magna maximus, nec semper purus dapibus. Nam tempor auctor mattis. Nulla lobortis leo in lectus placerat, ut vulputate diam tincidunt. Sed dictum ac nisl sit amet cursus. Etiam eu orci tempor, posuere risus sagittis, vehicula tortor. Integer neque ipsum, mollis vitae tempus ut, interdum in urna. In ultricies sem lectus, sit amet rhoncus lacus ultrices sed. Donec hendrerit lacus leo, ultrices tempus leo rutrum ut. Nunc vitae condimentum nunc, et posuere felis. Mauris sem orci, tincidunt eu semper sit amet, dapibus et tortor. Donec ipsum felis, pharetra quis lacus eget, viverra hendrerit nibh. Quisque pellentesque interdum viverra. Aliquam vulputate nunc nibh, nec placerat quam vestibulum id. Duis nisl turpis, consectetur in elit sit amet, vehicula lobortis ante. Donec eget rhoncus nulla. In nec odio eu enim mollis finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus tincidunt accumsan ex, id malesuada lectus. Nulla a egestas dui. Sed eu massa vel nunc sodales elementum. Vestibulum diam neque, cursus id nunc sed, dapibus mattis elit. Nulla sit amet viverra elit. Aliquam eu nulla ac sem luctus volutpat. Pellentesque feugiat ligula dolor, at venenatis nisl rutrum vitae. Duis varius dui efficitur ante mollis tempus. Phasellus volutpat quam sem, in dictum enim luctus vitae. Vestibulum luctus lectus congue lorem egestas, vel laoreet tellus mattis. Integer egestas eros a sodales gravida. Integer consectetur, libero eget volutpat elementum, lectus mauris malesuada ante, a malesuada sapien nisi eget leo. Morbi commodo justo vel nisi dictum pretium. Sed eu odio sollicitudin, egestas mi non, fermentum tellus. Aenean tempus, quam nec imperdiet viverra, justo tellus consequat lectus, sed venenatis diam neque sed velit. Nullam eros diam, laoreet ut porttitor ornare, porta vitae purus. Donec leo erat, tempus eget enim at, maximus porttitor metus. Donec pretium risus quis dui lobortis feugiat in quis erat. Maecenas dictum rutrum velit in consequat. Integer lectus elit, iaculis eu tristique blandit, rutrum eu diam. Donec dapibus id lorem vel finibus. Donec tincidunt leo id felis congue, vitae laoreet nisi consequat. Curabitur egestas elit ut pretium auctor. Integer sodales mi ac mi feugiat dignissim. Integer interdum, lacus sit amet aliquet ullamcorper, quam magna pulvinar nunc, eu gravida enim nisl id massa. Sed suscipit dictum nisl suscipit vestibulum. Vivamus eget nulla nunc.",
      "createdAt": "2024-01-11T10:56:38.517Z",
      "updatedAt": "2024-01-12T09:28:30.702Z",
      "tagList": [
        "big text"
      ],
      "favorited": false,
      "favoritesCount": 2,
      "author": {
        "username": "blakuto",
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
      }
    },
    {
      "slug": "sereznyj-post-s-bolshim-zagolo-sy6p39",
      "title": "Серезный пост с большим заголо",
      "description": "Какое-то описание максимальной длины",
      "body": "ТЕКСТТЕКСТТЕКСТТЕКСТТЕКСТТЕКСТТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ ТЕКСТ",
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
  ],
  "articlesCount": 2
};

export const FeedUnauth: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/articles/*', (_, res, ctx) => {
          return res(
            ctx.json(mockArticles)
          );
        }),
      ]
    },
  }
};
