import {Divider, Flex, notification, Typography} from "antd";
import AuthForm from "./AuthForm.tsx";
import type {FieldType} from "./authTypes.ts";
import {useNavigate} from "react-router-dom";
import usersStore from "../../store/usersStore.ts";
import {useState} from "react";

const {Title} = Typography;

const Authorization = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const onFinish = (inputUserData: FieldType) => {
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
    <Flex
      align="center"
      vertical={true}
    >
      <Title>
        Authorization
      </Title>
      <Divider/>
      <AuthForm
        type="authorization"
        disabled={isDisabled}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Flex>
  );
};

export default Authorization;