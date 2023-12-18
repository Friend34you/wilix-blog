import {Flex, Layout, Typography} from "antd";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import UserContent from "./UserContent.tsx";

const {Text} = Typography;
const {Header} = Layout;

const AppHeader = () => {

  return (
    <StyleHeader>
      <StyledFlex
        align="center"
        justify="space-between"
      >
        <StyledLink to="/">
          <Logo />
          <Text>
            Wilix-Blog
          </Text>
        </StyledLink>
        <UserContent />
      </StyledFlex>
    </StyleHeader>
  );
};

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