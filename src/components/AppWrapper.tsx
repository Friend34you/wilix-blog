import AppHeader from "./header/AppHeader.tsx";
import {Outlet} from "react-router-dom";
import {Layout, Typography} from "antd";
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
        <StyledParagraph>
          Some footer text. Do you like space and kitties? I think you do, so create your account and write lots of articles
        </StyledParagraph>
        <StyledParagraph>
          One more text with description
        </StyledParagraph>
      </AppFooter>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  background-color: white;
`;

const AppMain = styled.main`
  min-height: 90vh;
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

const StyledParagraph = styled(Paragraph)`
  font-size: 1.3em;
  margin: 10px;
  color: white;
`;

export default AppWrapper;