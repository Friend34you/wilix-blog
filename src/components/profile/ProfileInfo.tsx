import {Avatar, Button, Flex, notification, Typography} from "antd";
import styled from "styled-components";
import usersStore from "../../store/usersStore.ts";
import profilesStore from "../../store/profilesStore.ts";
import {Link} from "react-router-dom";
import {Routes} from "../router/routes.tsx";
import {observer} from "mobx-react-lite";
import {useState} from "react";

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

  let profileButton = (
    <StyledButton
      onClick={handleOnFollowClick}
      disabled={isDisabled}
    >
      {profilesStore.profile!.following ? "Unfollow" : "Follow"}
    </StyledButton>
  );

  if (!usersStore.isUserAuth) {
    profileButton = (
      <Link to={Routes.AUTHORIZATION}>
        <StyledButton>
          Follow
        </StyledButton>
      </Link>
    );
  }

  //Редактирования профиля у нас нет, так что пока без ссылочной обёртки
  if (usersStore.isUserAuth && usersStore.user?.username === profilesStore.profile!.username) {
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
          src={profilesStore.profile!.image}
        >
          {profilesStore.profile!.username}
        </Avatar>
        {profilesStore.profile!.username}
      </ProfileCard>
      {profileButton}
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