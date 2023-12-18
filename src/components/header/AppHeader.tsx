import {Flex, Layout, Typography} from "antd";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import Navigation from "./Navigation.tsx";

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
          <StyledText>
            Wilix-Blog
          </StyledText>
        </StyledLink>
        <nav>
          <Navigation />
        </nav>
      </StyledFlex>
    </StyleHeader>
  );
};

const Logo = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 65px;
  width: 80px;
  min-width: 30px;
`;

const StyleHeader = styled(Header)`
  background-color: white;
  box-shadow: 0px 11px 26px -16px rgba(34, 60, 80, 0.37);
`;

const StyledFlex = styled(Flex)`
  height: 100%;
`;

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledText = styled(Text)`
  color: #3716af;
  font-size: 18px;
  font-weight: bold;
`;

export default AppHeader;