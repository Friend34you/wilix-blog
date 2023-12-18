import {Space, Typography} from "antd";
import usersStore from "../../store/usersStore.ts";
import styled from "styled-components";
import {UserOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
// import {useEffect, useState} from "react";
// import profilesStore from "../../store/profilesStore.ts";

const {Text} = Typography;

const UserContent = observer(() => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);

  if (!usersStore.isUserAuth) {
    return (
      <p>lox</p>
    );
  }

  return (
    <Space>
      {usersStore.isUserAuth && usersStore.user && (
        <Space align="center">
          <UserIcon />
          <Text>
            {usersStore.user?.username}
          </Text>
        </Space>
      )}
    </Space>
  );
});

const UserIcon = styled(UserOutlined)`
  font-size: 25px;;
`;

export default UserContent;
