import {useUnit} from "effector-react";
import {useEffect} from "react";
import {notification} from "antd";
import profilesStore from "../store/ProfilesStore.ts";

export const useFollowError = () => {
  const toggleFollowError = useUnit(profilesStore.toggleFollowError);

  useEffect(() => {
    if (toggleFollowError) {
      notification.error({message: toggleFollowError.message});
    }

    return () => {
      profilesStore.profileChanged(null);
    };
  }, [toggleFollowError]);
};