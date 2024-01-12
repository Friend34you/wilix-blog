import {describe, test, expect} from "vitest";
import {allSettled, fork} from "effector";
import usersStore from "../store/UsersStore.ts";

describe('UsersStore', () => {
  test("login user", async () => {
    const mockResponse = {
      isAuth: true,
      token: "sometoken",
      user: {
        email: "pedro@mail.ru",
        username: "Pedro Pascal",
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
        email: "pedro@mail.ru",
        password: "1234"
      }
    });

    expect(scope.getState(usersStore.user)).toEqual({
      email: "pedro@mail.ru",
      username: "Pedro Pascal",
    });
  });
});