import {Button, Flex, Form, Input} from "antd";
import type {FC} from "react";
import styled from "styled-components";
import type {ValidateErrorEntity} from "rc-field-form/lib/interface";
import type {FieldType} from "./authTypes.ts";

interface AuthFormProps {
  readonly type: "registration" | "authorization";
  readonly onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  readonly onFinish: (values: FieldType) => void;
  readonly disabled: boolean
}

const AuthForm: FC<AuthFormProps> = ({onFinishFailed, onFinish, type, disabled}) => {

  const [form] = StyledForm.useForm();

  const handleReset = () => form.resetFields();

  return (
    <StyledForm
      form={form}
      autoComplete="off"
      name="basic"
      disabled={disabled}
      initialValues={{remember: true}}
      labelCol={{span: 8}}
      wrapperCol={{span: 17}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {type === "registration" && (
        <StyledForm.Item<FieldType>
          label="Username"
          name="username"
          rules={[{required: true, message: 'Please input your username!'}]}
        >
          <Input />
        </StyledForm.Item>
      )}

      <StyledForm.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!'
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          }
        ]}
      >
        <Input />
      </StyledForm.Item>

      <StyledForm.Item<FieldType>
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password />
      </StyledForm.Item>

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