import {Button, Flex, Form, Input} from "antd";
import {FC} from "react";
import styled from "styled-components";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {FieldType} from "./authTypes.ts";

interface AuthFormProps {
    type: "registration" | "authorization";
    onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
    onFinish: (values: FieldType) => void;
}

const StyledForm = styled(Form)`
  max-width: 500px;
`

const AuthForm: FC<AuthFormProps> = ({onFinishFailed, onFinish, type}) => {

    const [form] = StyledForm.useForm()

    const handleReset = () => form.resetFields()

    return (
        <StyledForm
            name="basic"
            labelCol={{span: 7}}
            wrapperCol={{span: 17}}
            form={form}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
                <Flex justify={"center"}>
                    <Button
                        type="primary"
                        htmlType="submit">
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