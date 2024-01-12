import {describe, test, expect} from "vitest";
import {allSettled, fork} from "effector";
import usersStore from "../store/UsersStore.ts";

describe('UsersStore', () => {
  test("login user", async () => {
    const mockResponse = {
      isAuth: true,
      token: "someToken",
      user: {
        email: "exampleMail@mail.ru",
        username: "example Pascal",
      }
    };

    const scope = fork({
      handlers: [
        [usersStore.loginUser, () => mockResponse]
      ]
    });

    expect(scope.getState(usersStore.user)).toEqual(null);

    await allSettled(usersStore.loginUser, {
      scope,
      params: {
        email: "exampleMail@mail.ru",
        password: "some password"
      }
    });

    expect(scope.getState(usersStore.user)).toEqual({
      email: "exampleMail@mail.ru",
      username: "example Pascal",
    });
  });
});