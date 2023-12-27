import {Avatar, Flex, notification, Typography} from "antd";
import styled from "styled-components";
import profilesStore from "../../store/profilesStore.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import ProfileInfoButton from "./ProfileInfoButton.tsx";

const {Paragraph} = Typography;

//знаем, что используется ток в Profile, поэтому выцепляем данные напрямую
const ProfileInfo = observer(() => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOnFollowClick = () => {
    setIsDisabled(true);
    profilesStore
      .toggleFollowUserProfile(profilesStore.profile!.username)
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsDisabled(false));
  };

  return (
    <ProfileInfoWrapper
      justify="flex-start"
      align="center"
      gap={15}
    >
      <ProfileCard
        vertical
        align="center"
        gap={10}
      >
        <Avatar
          shape="square"
          size={130}
          gap={100}
          src={profilesStore.profile!.image}
        >
          {profilesStore.profile!.username}
        </Avatar>
        {profilesStore.profile!.username}
      </ProfileCard>
      <ProfileInfoButton
        onFollowClick={handleOnFollowClick}
        isDisabled={isDisabled}
      />
      {profilesStore.profile!.bio && (
        <AuthorBio>
          {profilesStore.profile!.bio}
        </AuthorBio>
      )}
    </ProfileInfoWrapper>
  );
});

const ProfileInfoWrapper = styled(Flex)`
  background: -webkit-linear-gradient(143deg, #21053b,#d43573);                        
  background: linear-gradient(143deg, #21053b,#d43573);
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 4px 4px 8px -2px rgba(34, 60, 80, 0.2);
  height: 80vh;
  width: 18vw;
  position: fixed;
  flex-direction: column;
  margin-top: 2vh;
  
  @media (max-width: 1600px) {
    border-radius: 0;
    height: auto;
    width: 100vw;
    position: static;
  }
`;

const ProfileCard = styled(Flex)`
  margin-top: 40px;
  padding: 15px;
  max-width: 80%;
  background-color: white;
  border-radius: 7px;
`;

const AuthorBio = styled(Paragraph)`
  font-size: 16px;
  color: white;
  padding: 8px;
  height: 30%;
  width: 90%;
  overflow: scroll;
  
  @media (max-width: 1600px) {
    height: 14vh;
    width: 60%;
    min-width: 270px;
  }
`;

export default ProfileInfo;