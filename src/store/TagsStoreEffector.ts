import {createEffect, createEvent, createStore, sample} from "effector";
import {AxiosInstance} from "../api/axiosInstance";
import {createGate} from "effector-react";

type GetTagsResponseType = {
  tags: string[]
}

//Сторы
const $tags = createStore<string[]>([]);
const $error = createStore<Error | null>(null);
const $selectedTag = createStore<string | null>(null);

//Ивенты
const selectedTagChanged = createEvent<string | null>("selected tag changed");

//Эффекты
const fetchTagsFx = createEffect<void, string[], Error>(async () => {
  try {
    const response = await AxiosInstance.get<GetTagsResponseType>("/tags");
    return response.data.tags;
  } catch (error) {
    throw new Error("Something went wrong:( " + error);
  }
});

//Гейты
const tagsCloudGate = createGate();

//Взаимодействие
sample({
  clock: tagsCloudGate.open,
  target: fetchTagsFx,
});

$tags.on(fetchTagsFx.doneData, (_, tagsData) => tagsData);
$error.on(fetchTagsFx.failData, (_, errorData) => errorData);
$selectedTag.on(selectedTagChanged, (_, data) => data);

const tagsStore = {
  tags: $tags,
  selectedTagValue: $selectedTag,
  error: $error,
  selectedTag: selectedTagChanged,
  fetchTags: fetchTagsFx,
  tagsCloudGate: tagsCloudGate,
};

export default tagsStore;