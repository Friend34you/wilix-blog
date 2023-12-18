import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import profilesStore from "../store/profilesStore.ts";
import {Avatar, Button, Flex, notification, Spin} from "antd";
import styled from "styled-components";

const Profile = () => {
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
      <Spin size="large" />
    );
  }

  return (
    <Flex vertical>
      <ProfileInfoWrapper
        vertical
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
            size={180}
            gap={100}
            src={profilesStore.profile!.image}
          >
            {profilesStore.profile!.username}
          </Avatar>
          {profilesStore.profile!.username}
        </ProfileCard>
        <Button ghost>
          Follow this author
        </Button>
      </ProfileInfoWrapper>
      <ProfileArticlesWrapper vertical>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
        <h1>fdfdsdsfdsfsdfdsffds</h1>
      </ProfileArticlesWrapper>
    </Flex>
  );
};

const ProfileInfoWrapper = styled(Flex)`
  background: -webkit-linear-gradient(90deg, #503767, #b93aaa); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(90deg, #503767, #b93aaa); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
  width: 18vw;
  padding: 20px;
  position: fixed;


  @media (max-width: 1600px) {
    height: auto;
    width: 100vw;
    position: static;
  }
`;

const  ProfileCard = styled(Flex)`
  padding: 15px;
  max-width: 80%;
  background-color: white;
  border-radius: 7px;
`;

const ProfileArticlesWrapper = styled(Flex)`
  margin-left: 18vw;
  padding: 10px;


  @media (max-width: 1600px) {
    height: auto;
    width: 100vw;
    margin: 10px;
  }
`;

export default Profile;
