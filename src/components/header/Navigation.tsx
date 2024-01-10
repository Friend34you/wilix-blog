import type {MenuProps} from "antd";
import {Flex, Space, Spin} from "antd";
import usersStore from "../../store/UsersStore.ts";
import styled from "styled-components";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Routes} from "../router/routes.tsx";
import { Menu } from 'antd';
import {useUnit} from "effector-react/compat";

//Оставил здесь, так как требуется для элементов меню
const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  color: black;
`;

const items: MenuProps["items"] = [
  {
    label: (
      <StyledLink to="/">
        Home
      </StyledLink>
    ),
    key: 'home',
  },
  {
    label: (
      <StyledLink to={Routes.AUTHORIZATION}>
        SignIn
      </StyledLink>
    ),
    key: 'signIn',
  },
  {
    label: (
      <StyledLink to={Routes.REGISTRATION}>
        SignUp
      </StyledLink>
    ),
    key: 'signUp',
  },
];
const privateItems: MenuProps["items"] = [
  {
    label: (
      <StyledLink to="/">
        Home
      </StyledLink>
    ),
    key: 'home',
  },
  {
    label: (
      <StyledLink to={Routes.CREATE_ARTICLE}>
        New Article
      </StyledLink>
    ),
    key: "newArticle",
  },
];

const Navigation = () => {
  const isUserAuth = useUnit(usersStore.isUserAuth);
  const user = useUnit(usersStore.user);

  if (!isUserAuth) {
    return (
      <Flex align="center" vertical={true}>
        <StyledMenu
          items={items}
          mode="horizontal"
          selectable={false}
          triggerSubMenuAction="click"
          selectedKeys={[]}
        />
      </Flex>
    );
  }

  if (isUserAuth && !user) {
    return (
      <Spin />
    );
  }

  return (
    <Flex align="center">
      <StyledMenu
        items={privateItems}
        mode="horizontal"
        selectable={false}
        triggerSubMenuAction="click"
        selectedKeys={[]}
      />
      <StyledLink to={Routes.CURRENT_PROFILE + user!.username}>
        <Space align="center">
          <UserIcon />
          {user?.username}
        </Space>
      </StyledLink>
    </Flex>
  );
};

const StyledMenu = styled(Menu)`
  background-color: transparent;
  & svg {
    font-size: 25px;
  }

  @media (min-width: 1024px) {
    min-width: 250px;
  }
`;

const UserIcon = styled(UserOutlined)`
  font-size: 25px;;
`;

export default Navigation;
