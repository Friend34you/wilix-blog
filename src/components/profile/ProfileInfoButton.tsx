import profilesStore from "../../store/ProfilesStoreEffector";
import usersStore from "../../store/usersStore.ts";
import {Link} from "react-router-dom";
import {Routes} from "../router/routes.tsx";
import styled from "styled-components";
import {Button} from "antd";
import type {FC} from "react";
import {useUnit} from "effector-react";

type ProfileInfoButtonProps = {
  readonly onFollowClick: () => void;
  readonly isDisabled: boolean
}

const ProfileInfoButton: FC<ProfileInfoButtonProps> = ({onFollowClick, isDisabled}) => {
  const profile = useUnit(profilesStore.profile);

  if (!usersStore.isUserAuth) {
    return (
      <Link to={Routes.AUTHORIZATION}>
        <StyledButton>
          Follow
        </StyledButton>
      </Link>
    );
  }

  //Редактирования профиля у нас нет, так что пока без ссылочной обёртки
  if (usersStore.isUserAuth && usersStore.user?.username === profile!.username) {
    return (
      <StyledButton>
        Edit Settings
      </StyledButton>
    );
  }

  return (
    <StyledButton
      onClick={onFollowClick}
      disabled={isDisabled}
    >
      {profile!.following ? "Unfollow" : "Follow"}
    </StyledButton>
  );
};

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

export default ProfileInfoButton;