import styled from "styled-components";
import {Flex} from "antd";

export const FormWrapper = styled(Flex)`
  padding: 20px 60px;
  width: fit-content;
  box-shadow: 0 4px 6px -1px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, .2);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    box-shadow: none;
    padding: 0;
    width: 100%;
  }
`;