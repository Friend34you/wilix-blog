import {describe, test, expect} from "vitest";
import {allSettled, fork} from "effector";
import tagsStore from "../store/TagsStore.ts";

describe('TagsStore',() => {
  test("fetch tags: respEqual", async () => {
    const mockTags = ["firstTag, secondOne, third"];

    const scope = fork({
      handlers: [
        [tagsStore.fetchTags, () => mockTags]
      ]
    });

    expect(scope.getState(tagsStore.tags)).toEqual([]);

    await allSettled(tagsStore.fetchTags, {scope});

    expect(scope.getState(tagsStore.tags)).toEqual(mockTags);
  });

  test("fetch tags: respNotEqual", async () => {
    const mockTags = ["firstTag, secondOne, third"];

    const scope = fork({
      handlers: [
        [tagsStore.fetchTags, () => mockTags]
      ]
    });

    expect(scope.getState(tagsStore.tags)).toEqual([]);

    await allSettled(tagsStore.fetchTags, {scope});

    expect(scope.getState(tagsStore.tags)).not.toEqual(["1", "error", "2"]);
  });
});