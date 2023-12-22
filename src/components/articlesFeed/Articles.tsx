import {Flex, Segmented} from "antd";
import styled from "styled-components";
import {useState} from "react";
import {RequestModes} from "../../types/requestModes.ts";
import UserFeed from "./UserFeed.tsx";
import Feed from "./Feed.tsx";

const articlesOptions = [RequestModes.ALL_ARTICLES_FEED, RequestModes.YOUR_ARTICLES_FEED];

const Articles = () => {

  const [mode, setMode] = useState<string | number>(RequestModes.ALL_ARTICLES_FEED);

  const handleOnModeChange = (option: string | number) => {
    setMode(option);
  };

  //TODO: разобраться с роутингом на приватный роут YOUR_ARTICLES_FEED

  // if (mode === RequestModes.YOUR_ARTICLES_FEED) {
  //   return (
  //     <Wrapper
  //       align="center"
  //       justify="flex-start"
  //       vertical
  //     >
  //       <Segmented
  //         options={articlesOptions}
  //         value={mode}
  //         onChange={handleOnModeChange}
  //       />
  //      <UserFeed />
  //     </Wrapper>
  //   );
  // }

  return (
    <Wrapper
      align="center"
      vertical
    >
      <Segmented
        options={articlesOptions}
        value={mode}
        onChange={handleOnModeChange}
      />
      {mode === RequestModes.YOUR_ARTICLES_FEED ? <UserFeed /> : <Feed />}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  padding: 10px;
  min-height: 80vh;
`;

export default Articles;