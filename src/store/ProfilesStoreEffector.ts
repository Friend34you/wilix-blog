import type {IProfile} from "../types/profileType";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ApiMethods, AxiosInstance} from "../api/axiosInstance";

type GetUserProfileResponseType = {
  profile: IProfile;
}

type ToggleFollowUserProfileType = {
  username: string,
  isFollowed: boolean,
}

//Сторы
const $profile = createStore<IProfile | null>(null);

//Ивенты
const profileChanged = createEvent();
const userProfileFollowToggled = createEvent<string>();
const userProfileFetched = createEvent<string>();
// const userProfileUnfetched = createEvent<string>();

//Эффекты
const fetchUserProfileFx = createEffect(async (username: string) => {
  try {
    const response = await AxiosInstance.get<GetUserProfileResponseType>("/profiles/" + username);
    return response.data.profile;
  } catch
    (error) {
    throw new Error("Something went wrong :(" + error);
  }
});

const toggleFollowUserProfileFx = createEffect(async ({username, isFollowed}: ToggleFollowUserProfileType) => {
  try {
    await AxiosInstance<GetUserProfileResponseType>("/profiles/" + username + "/follow", {
      method: isFollowed ? ApiMethods.DELETE : ApiMethods.POST,
    });
    return !isFollowed;
  } catch
    (error) {
    throw new Error("Something went wrong :(" + error);
  }
});

//Хелперы

//Взаимодействие
sample({
  clock: userProfileFollowToggled,
  source: $profile,
  filter: (profileData) => !!profileData,
  fn: (_, username) => username,
  target: userProfileFetched,
});

sample({
  clock: userProfileFetched,
  source: $profile,
  fn: (profileData, username): ToggleFollowUserProfileType => ({isFollowed: profileData!.following, username}),
  target: toggleFollowUserProfileFx
});

$profile.on(profileChanged, (_, profileData) => profileData);
$profile.on(fetchUserProfileFx.doneData, (_, profileData) => profileData);
$profile.on(toggleFollowUserProfileFx.doneData, (state): IProfile => {
  return {
    ...state!,
    following: !state!.following
  };
});

const profilesStore = {
  profile: $profile,
  fetchUserProfile: fetchUserProfileFx,
  toggleFollowUserProfile: userProfileFollowToggled,
};

export default profilesStore;
