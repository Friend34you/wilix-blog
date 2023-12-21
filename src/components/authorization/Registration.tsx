import {Divider, Flex, notification, Typography} from "antd";
import AuthForm from "./AuthForm.tsx";
import type {FieldType} from "./authTypes.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import usersStore from "../../store/usersStore.ts";

const {Title} = Typography;

const Registration = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const onFinish = (inputUserData: FieldType) => {
    const registerData = {
      username: inputUserData.username!,
      email: inputUserData.email!,
      password: inputUserData.password!
    };

    setIsDisabled(true);
    usersStore
      .registerUser(registerData)
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
        Registration
      </Title>
      <Divider/>
      <AuthForm
        type="registration"
        disabled={isDisabled}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Flex>
  );
};

export default Registration;