import {Avatar, Flex, notification, Typography} from "antd";
import styled from "styled-components";
import profilesStore from "../../store/ProfilesStore.ts";
import {observer} from "mobx-react-lite";
import ProfileInfoButton from "./ProfileInfoButton.tsx";
import {useUnit} from "effector-react";

const {Paragraph} = Typography;

//знаем, что используется ток в Profile, поэтому выцепляем данные напрямую
const ProfileInfo = observer(() => {
  const profile = useUnit(profilesStore.profile);
  const error = useUnit(profilesStore.toggleFollowError);
  const isDisabled = useUnit(profilesStore.toggleFollowLoading);
  const handleOnFollowClick = () => {
    profilesStore.toggleFollowUserProfile(profile!.username);

    if (error) {
      notification.error({message: error.message});
    }
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
        data-testid="profile-username"
      >
        <Avatar
          shape="square"
          size={130}
          gap={100}
          src={profile!.image}
        >
          {profile!.username}
        </Avatar>
        {profile!.username}
      </ProfileCard>
      <ProfileInfoButton
        onFollowClick={handleOnFollowClick}
        isDisabled={isDisabled}
      />
      {profile!.bio && (
        <AuthorBio>
          {profile!.bio}
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