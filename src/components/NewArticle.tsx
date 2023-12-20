import type {FieldType} from "./authorization/authTypes.ts";
import {Button, Flex, Form, Input} from "antd";
import styled from "styled-components";
import type {ValidateErrorEntity} from "rc-field-form/lib/interface";
import type {IArticle} from "../types/articleType.ts";

type CreateAricleFieldType = Pick<IArticle, "title" | "description" | "body" | "tagList">

const NewArticle = () => {

  const [form] = StyledForm.useForm();

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const handleReset = () => form.resetFields();

  return (
    <StyledForm
      autoComplete="off"
      form={form}
      initialValues={{remember: true}}
      labelCol={{span: 7}}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      wrapperCol={{span: 17}}
    >
      <StyledForm.Item<CreateAricleFieldType>
        label="Title"
        name="title"
        rules={[{required: true, message: 'Please input your username!'}]}
      >
        <Input/>
      </StyledForm.Item>

      <StyledForm.Item<CreateAricleFieldType>
        label="Email"
        name="email"
        rules={[{required: true, message: 'Please input your email!'}]}
      >
        <Input/>
      </StyledForm.Item>

      <StyledForm.Item<CreateAricleFieldType>
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password/>
      </StyledForm.Item>

      <StyledForm.Item wrapperCol={{offset: 2}}>
        <Flex justify="center">
          <Button
            htmlType="submit"
            type="primary">
            SignUp
          </Button>

          <Button
            htmlType="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Flex>
      </StyledForm.Item>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  max-width: 500px;
`;

export default NewArticle;