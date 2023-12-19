import {Avatar, Button, Flex, Typography} from "antd";
import styled from "styled-components";
import type {IProfile} from "../../types/profileType.ts";
import type {FC} from "react";
import usersStore from "../../store/usersStore.ts";

type ProfileAuthorProos = IProfile & {
  readonly onFollowClick: () => void
}

const {Paragraph} = Typography;

const ProfileInfo: FC<ProfileAuthorProos> = ({
  username,
  image,
  bio,
  following,
  onFollowClick
}) => {

  let profileButton = (
    <StyledButton
      onClick={onFollowClick}
    >
      {following ? "Unfollow" : "Follow"}
    </StyledButton>
  );

  //Редактирования профиля у нас нет, так что пока без ссылочной обёртки
  if (usersStore.isUserAuth && usersStore.user?.username === username) {
    profileButton = (
      <StyledButton>
        Edit Settings
      </StyledButton>
    );
  }

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
          src={image}
        >
          {username}
        </Avatar>
        {username}
      </ProfileCard>
      {profileButton}
      {bio && (
        <AuthorBio>
          {bio}
        </AuthorBio>
      )}
    </ProfileInfoWrapper>
  );
};

const ProfileInfoWrapper = styled(Flex)`
  background: -webkit-linear-gradient(143deg, #21053b,#d43573);                        
  background: linear-gradient(143deg, #21053b,#d43573);
  height: 94vh;
  width: 18vw;
  position: fixed;
  flex-direction: column;

  @media (max-width: 1600px) {
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

const StyledButton = styled(Button)`
  min-width: 200px;
  color: white;
  background-color: #1e044b;
  border: none;
  border-radius: 10px;
  margin: 10px;
  transition: 0.2s linear;
  
  &:hover {
    background-color: white;
  }
`;

export default ProfileInfo;