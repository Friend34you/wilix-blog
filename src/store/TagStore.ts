import {AxiosInstance} from "../api/axiosInstance.ts";

type getTagsResponseType = {
  tags: string[]
}

class TagStore {
  private tagsList: string[] = [];

  get tags() {
    return this.tagsList;
  }

  set tags(tagsData) {
    this.tagsList = tagsData;
  }

  getTags = async () => {
    try {
      const response = await AxiosInstance.get<getTagsResponseType>("/tags");
      const tagsData = response.data;
      this.tags = tagsData.tags;
    } catch (error) {
      throw new Error("Something went wrong:( " + error);
    }
  };
}

export default new TagStore();