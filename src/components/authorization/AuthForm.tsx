import {Button, Flex, Form, Input} from "antd";
import type {FC, ReactNode} from "react";
import {useMemo} from "react";
import styled from "styled-components";
import type {ValidateErrorEntity} from "rc-field-form/lib/interface";
import type {FieldType} from "./authTypes.ts";
import {AuthTypes} from "./authTypes.ts";
import type {Rule} from "antd/lib/form";

interface AuthFormProps {
  readonly type: AuthTypes;
  readonly onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  readonly onFinish: (values: FieldType) => void;
  readonly disabled: boolean
}

type formItemType = {
  label: string;
  name: string;
  rules: Rule[];
  children: ReactNode
}

const formItems: formItemType[] = [
  {
    label: "Username",
    name: "username",
    rules: [
      {
        required: true,
        message: 'Please input your username!'
      }],
    children: <Input />
  },
  {
    label: "Email",
    name: "email",
    rules: [
      {
        required: true,
        message: 'Please input your email!'
      },
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      }
    ],
    children: <Input />
  },
  {
    label: "Password",
    name: "password",
    rules: [
      {
        required: true,
        message: 'Please input your password!'
      }],
    children: <Input.Password />
  },
];

const AuthForm: FC<AuthFormProps> = ({onFinishFailed, onFinish, type, disabled}) => {

  const [form] = StyledForm.useForm();

  const authFormItems = useMemo(() => {
    if (type === AuthTypes.AUTHORIZATION) {
      return formItems.filter((formItem) => formItem.name !== "username");
    }
    return formItems;
  }, [type]);

  const handleReset = () => form.resetFields();

  return (
    <StyledForm
      form={form}
      autoComplete="off"
      name="basic"
      disabled={disabled}
      initialValues={{remember: true}}
      labelCol={{span: 8}}
      wrapperCol={{span: 18}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {authFormItems.map((formItem) => (
        <StyledForm.Item
          key={formItem.name}
          {...formItem}
        >
          {formItem.children}
        </StyledForm.Item>
      ))}
      <StyledForm.Item wrapperCol={{offset: 2}}>
        <Flex
          justify="center"
          gap={10}
        >
          <Button
            htmlType="submit"
            type="primary"
          >
            SignUp
          </Button>

          <Button
            onClick={handleReset}
            htmlType="button"
          >
            Reset
          </Button>
        </Flex>
      </StyledForm.Item>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  margin-top: 20px;
  max-width: 1400px;
`;

export default AuthForm;