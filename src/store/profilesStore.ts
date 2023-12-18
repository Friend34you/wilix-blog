import {makeAutoObservable} from "mobx";
import {ApiMethods, AxiosInstance} from "../api/axiosInstance.ts";
import type {IProfile} from "../types/profileType.ts";

type GetUserProfileResponseType = {
  profile: IProfile;
}

class ProfilesStore {
  private userProfile: IProfile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get profile() {
    return this.userProfile!;
  }

  set profile(profileData: IProfile | null) {
    this.userProfile = profileData;
  }

  fetchUserProfile = async (username: string) => {
    try {
      const response = await AxiosInstance.get<GetUserProfileResponseType>("/profiles/" + username);
      this.profile = response.data.profile;
    } catch
      (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };

  toggleFollowUserProfile = async (username: string) => {
    try {
      if (!this.profile) {
        await this.fetchUserProfile(username);
      }

      const isFollowed = this.profile!.following;

      await AxiosInstance<GetUserProfileResponseType>("/profiles/" + username + "/follow", {
        method: isFollowed ? ApiMethods.DELETE : ApiMethods.POST,
      });
      this.profile!.following = !isFollowed;
    } catch
      (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };
}

export default new ProfilesStore();