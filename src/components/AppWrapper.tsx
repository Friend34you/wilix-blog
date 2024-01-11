import AppHeader from "./header/AppHeader.tsx";
import {Outlet} from "react-router-dom";
import {Flex, Layout, Typography} from "antd";
import styled from "styled-components";
import astronautImg from "./../assets/footerImg.svg";

const {Paragraph} = Typography;

const AppWrapper = () => {
  return (
    <StyledLayout>
      <AppHeader />
      <AppMain>
        <Outlet />
      </AppMain>
      <AppFooter>
        <FooterFlex
          vertical
          justify="center"
        >
          <StyledParagraph>
            Some footer text. Do you like space and kitties? I think you do, so create your account and write lots of articles
          </StyledParagraph>
          <StyledParagraph>
            One more text with description
          </StyledParagraph>
        </FooterFlex>
      </AppFooter>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  background-color: #f6f5f5;
`;

const AppMain = styled.main`
  height: 94vh;
  overflow: scroll;
`;

const AppFooter = styled.footer`
  padding: 30px;
  display: flex;
  min-height: 35vh;
  background-color: #35293a;
  background-image: url(${astronautImg});
  background-repeat: no-repeat;
  background-position: right;
`;

const FooterFlex = styled(Flex)`
  width: inherit;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: 1.3em;
  margin: 10px;
  color: white;
`;

export default AppWrapper;