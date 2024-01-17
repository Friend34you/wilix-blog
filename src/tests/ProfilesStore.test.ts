import {describe, test, expect} from "vitest";
import {allSettled, fork} from "effector";
import profilesStore from "../store/ProfilesStore.ts";

describe('ProfilesStore',() => {
  test("fetch userProfile", async () => {

    const scope = fork({
      handlers: [
        [profilesStore.fetchUserProfile, () => ({username: "King"})]
      ]
    });

    expect(scope.getState(profilesStore.profile)).toEqual(null);

    await allSettled(profilesStore.fetchUserProfile, {
      scope,
      params: "King"
    });

    expect(scope.getState(profilesStore.profile)).not.toEqual({username: "Vlad"});
  });
});