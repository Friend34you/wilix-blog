import {makeAutoObservable} from "mobx";
import {AxiosInstance} from "../api/axiosInstance.ts";
import type {IProfile} from "../types/profileType.ts";

type getUserProfileResponseType = {
  profile: IProfile;
}

class ProfileStore {
  private userProfile: IProfile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get profile() {
    return this.userProfile!;
  }

  set profile(profileData: IProfile) {
    this.userProfile = profileData;
  }

  getUserProfile = async (username: string) => {
    try {
      const response = await AxiosInstance.get<getUserProfileResponseType>("/profiles/" + username);
      const profileData = response.data;
      this.profile = profileData.profile;
    } catch
      (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };

  toggleFollowUserProfile = async (username: string) => {
    try {
      if (this.userProfile?.following) {
        await AxiosInstance.delete<getUserProfileResponseType>("/profiles/" + username + "/follow");
        this.profile.following = false;
        return;
      }

      await AxiosInstance.post<getUserProfileResponseType>("/profiles/" + username + "/follow");
      this.profile.following = true;
    } catch
      (error) {
      throw new Error("Something went wrong :(" + error);
    }
  };
}

export default new ProfileStore();