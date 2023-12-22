import {Flex, Segmented} from "antd";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {RequestModes} from "../../types/requestModes.ts";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Routes} from "../router/routes.tsx";

const articlesOptions = [RequestModes.ALL_ARTICLES_FEED, RequestModes.YOUR_ARTICLES_FEED];

const Articles = () => {
  const [mode, setMode] = useState<string | number>(RequestModes.ALL_ARTICLES_FEED);

  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname.includes(Routes.FAVORITE_ARTICLES)) {
      setMode(RequestModes.YOUR_ARTICLES_FEED);
    }
  },[pathname]);

  const handleOnModeChange = (option: string | number) => {
    setMode(option);
    if (option === RequestModes.YOUR_ARTICLES_FEED) {
      navigate(Routes.FAVORITE_ARTICLES);
      return;
    }
    navigate(Routes.ARTICLES);
  };

  return (
    <Wrapper
      align="center"
      vertical
    >
      <StyledSegmented
        options={articlesOptions}
        value={mode}
        onChange={handleOnModeChange}
      />
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  padding: 5vh 0;
  min-height: 100vh;
`;

const StyledSegmented = styled(Segmented)`
  margin: 15px;
`;

export default Articles;