import {Avatar, Flex, Layout, Space, Spin, Typography} from "antd";
import styled from "styled-components";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import profilesStore from "../store/profilesStore.ts";
import usersStore from "../store/usersStore.ts";
import {observer} from "mobx-react-lite";

const {Text} = Typography;
const {Header} = Layout;

const AppHeader = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (usersStore.isUserAuth) {
      setIsLoading(true);
      profilesStore
        .getUserProfile(usersStore.user!.username)
        .then(() => setIsSuccess(true))
        .catch()
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <StyleHeader>
      <StyledFlex
        align="center"
        justify="space-between"
      >
        <StyledLink to="/">
          <Logo/>
          <Text>
            Wilix-Blog
          </Text>
        </StyledLink>
        <Space>
          {isLoading && (
            <Spin/>
          )}
          {usersStore.isUserAuth && isSuccess && (
            <>
              <Avatar>
                {/*{.charAt(0)}*/}
              </Avatar>
              <Text>
                {/*{}*/}
                username
              </Text>
            </>
          )}
        </Space>
      </StyledFlex>
    </StyleHeader>
  )
    ;
});

const Logo = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 60px;
  width: 80px;
  min-width: 30px;
`;

const StyleHeader = styled(Header)`
  background-color: white;
  border: 3px solid black;
`;

const StyledFlex = styled(Flex)`
  height: 100%;
`;

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
`;

export default AppHeader;