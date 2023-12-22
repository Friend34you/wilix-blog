import styled from "styled-components";
import {Flex} from "antd";

export const ArticlesWrapper = styled(Flex)`
  min-height: 75vh;
  
  @media(min-width: 1024px) {
    max-width: 50vw;
  }
`;

export const EmptyBlock = styled(Flex)`
  height: 70vh;
  width: inherit;
`;