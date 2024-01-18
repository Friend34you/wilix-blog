import styled from "styled-components";
import {Flex} from "antd";

export const ArticlesWrapper = styled(Flex)`
  height: auto;
  
  @media(min-width: 1024px) {
    max-width: 50vw;
  }
`;

export const EmptyBlock = styled(Flex)`
  height: inherit;
  width: inherit;
`;