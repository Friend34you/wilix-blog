import {Divider, Flex, notification, Typography} from "antd";
import AuthForm from "./AuthForm.tsx";
import type {FieldType} from "./authTypes.ts";
import {Link, useNavigate} from "react-router-dom";
import usersStore from "../../store/usersStore.ts";
import {useState} from "react";
import styled from "styled-components";
import {FormWrapper} from "./FormWrapper.tsx";
import {Routes} from "../router/routes.tsx";
import {AuthTypes} from "./authTypes.ts";

const {Title, Text} = Typography;

const Authorization = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const onFinish = (inputUserData: FieldType) => {
    //Уверены, что значения есть
    const loginData = {
      email: inputUserData.email!,
      password: inputUserData.password!
    };

    setIsDisabled(true);
    usersStore
      .loginUser(loginData)
      .then(() => navigate("/"))
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsDisabled(false));
  };

  const onFinishFailed = () => {
    notification.error({message: "you must input all required fields"});
  };

  return (
    <AuthorizationWrapper
      align="center"
      vertical
    >
      <Divider />
      <FormWrapper
        align="center"
        vertical
      >
        <Title>
          Authorization
        </Title>
        <Text>
          Create account <Link to={Routes.REGISTRATION}>SignUp</Link>
        </Text>
        <AuthForm
          type={AuthTypes.AUTHORIZATION}
          disabled={isDisabled}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </FormWrapper>
    </AuthorizationWrapper>
  );
};

const AuthorizationWrapper = styled(Flex)`
  min-height: inherit;
  background: rgb(195, 34, 87);
  background: linear-gradient(0deg, rgb(136, 34, 195) 0%, rgba(253, 179, 45, 1) 100%);

  @media (max-width: 768px) {
    background: none;
  }
`;

export default Authorization;