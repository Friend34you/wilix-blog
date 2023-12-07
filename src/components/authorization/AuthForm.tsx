import {Button, Flex, Form, Input} from "antd";
import type {FC} from "react";
import styled from "styled-components";
import type {ValidateErrorEntity} from "rc-field-form/lib/interface";
import type {FieldType} from "./authTypes.ts";

interface AuthFormProps {
    readonly type: "registration" | "authorization";
    readonly onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
    readonly onFinish: (values: FieldType) => void;
}

const StyledForm = styled(Form)`
  max-width: 500px;
`;

const AuthForm: FC<AuthFormProps> = ({onFinishFailed, onFinish, type}) => {

    const [form] = StyledForm.useForm();

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
            <StyledForm.Item<FieldType>
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </StyledForm.Item>

            {type === "registration" && (
                <StyledForm.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input/>
                </StyledForm.Item>
            )}

            <StyledForm.Item<FieldType>
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

export default AuthForm;