import {createEffect, createEvent, createStore} from "effector";
import {AxiosInstance} from "../api/axiosInstance";

type GetTagsResponseType = {
  tags: string[]
}

const $selectedTag = createStore<string | null>(null);
const $tags = createStore<string[]>([]);

const selectedTagChanged = createEvent<string | null>("selected tag changed");

const fetchTagsFx = createEffect(async () => {
  try {
    const response = await AxiosInstance.get<GetTagsResponseType>("/tags");
    console.log("success", response.data);
    return response.data.tags;
  } catch (error) {
    throw new Error("Something went wrong:( " + error);
  }
});

$tags.on(fetchTagsFx.doneData, (_, tagsData) => tagsData);
$selectedTag.on(selectedTagChanged, (_, data) => data);

const tagsStore = {
  tags: $tags,
  selectedTag: selectedTagChanged,
  fetchTags: fetchTagsFx
};
export default tagsStore;