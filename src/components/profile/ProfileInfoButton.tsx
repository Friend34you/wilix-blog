import usersStore from "../../store/UsersStoreEffector";
import profilesStore from "../../store/ProfilesStoreEffector";
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
  const isUserAuth = useUnit(usersStore.isUserAuth);
  const user = useUnit(usersStore.user);
  const profile = useUnit(profilesStore.profile);

  //добавил для разлогинивания
  const handleOnLogout = () => usersStore.logoutUser();

  if (!isUserAuth) {
    return (
      <Link to={Routes.AUTHORIZATION}>
        <StyledButton>
          Follow
        </StyledButton>
      </Link>
    );
  }

  //Редактирования профиля у нас нет, так что пока без ссылочной обёртки
  if (isUserAuth && user?.username === profilesStore.profile!.username) {
    return (
      <>
        <StyledButton>
          Edit Settings
        </StyledButton>
        <StyledButton onClick={handleOnLogout}>
          LogOut
        </StyledButton>
      </>
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