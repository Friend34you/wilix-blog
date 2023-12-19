import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import profilesStore from "../../store/profilesStore.ts";
import {Flex, notification, Spin} from "antd";
import styled from "styled-components";
import ProfileInfo from "./ProfileInfo.tsx";
import ProfileArticles from "./ProfileArticles.tsx";
import {observer} from "mobx-react-lite";

const Profile = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const path = useLocation().pathname.split("/");
  const profileFromURL = path[path.length - 1];

  useEffect(() => {
    setIsLoading(true);
    profilesStore
      .fetchUserProfile(profileFromURL)
      .then(() => setIsSuccess(true))
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsLoading(false));

    return () => {
      setIsSuccess(false);
      profilesStore.profile = null;
    };
  }, [profileFromURL]);

  if (isLoading || !isSuccess) {
    return (
      <ProfileWrapper
        vertical
      >
        <Spin size="large" />
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper vertical>
      <ProfileInfo
        username={profilesStore.profile!.username}
        following={profilesStore.profile!.following}
        bio={profilesStore.profile!.bio}
        image={profilesStore.profile!.image}
        onFollowClick={() => console.log("click")}
      />
      <ProfileArticles profileName={profileFromURL} />
    </ProfileWrapper>
  );
});

const ProfileWrapper = styled(Flex)`

  overflow: hidden;
`;

export default Profile;
