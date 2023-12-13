import {AxiosInstance} from "../api/axiosInstance.ts";
import {makeAutoObservable} from "mobx";

type GetTagsResponseType = {
  tags: string[]
}

class TagsStore {
  private tagsList: string[] = [];
  private currentTag: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get tags() {
    return this.tagsList;
  }

  set tags(tagsData) {
    this.tagsList = tagsData;
  }

  get selectedTag() {
    return this.currentTag;
  }

  set selectedTag(tagToSelect) {
    this.currentTag = tagToSelect;
  }

  fetchTags = async () => {
    try {
      const response = await AxiosInstance.get<GetTagsResponseType>("/tags");
      const tagsData = response.data;
      this.tags = tagsData.tags;
    } catch (error) {
      throw new Error("Something went wrong:( " + error);
    }
  };
}

export default new TagsStore();