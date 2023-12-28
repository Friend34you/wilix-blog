import AuthForm from "./AuthForm.tsx";
import {Divider, Flex, notification, Typography} from "antd";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import usersStore from "../../store/UsersStoreEffector";
import styled from "styled-components";
import type {FieldType} from "./authTypes.ts";
import { FormWrapper } from "./FormWrapper.tsx";
import {Routes} from "../router/routes.tsx";
import {AuthTypes} from "./authTypes.ts";

const {Title, Text} = Typography;

const Registration = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const onFinish = (inputUserData: FieldType) => {
    //Уверены, что значения есть
    const registerData = {
      username: inputUserData.username!,
      email: inputUserData.email!,
      password: inputUserData.password!
    };

    setIsDisabled(true);
    usersStore
      .registerUser(registerData)
      .then(() => {
        notification.success({message: "You was successfully registered"});
        navigate("/");
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsDisabled(false));
  };

  const onFinishFailed = () => {
    notification.error({message: "you must input all required fields"});
  };

  return (
    <RegistrationWrapper
      align="center"
      vertical
    >
      <Divider />
      <FormWrapper
        align="center"
        vertical
      >
        <Title>
          Registration
        </Title>
        <Text>
          You already have account? <Link to={Routes.AUTHORIZATION}>SignIn</Link>
        </Text>
        <AuthForm
          type={AuthTypes.REGISTRATION}
          disabled={isDisabled}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </FormWrapper>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled(Flex)`
  min-height: inherit;
  background: rgb(195,34,87);
  background: linear-gradient(0deg, rgba(195,34,87,1) 0%, rgba(253,179,45,1) 100%);
  
  @media (max-width: 768px) {
    background: none;
  }
`;
export default Registration;