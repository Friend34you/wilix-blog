import {Button, Flex, Input} from "antd";
import {FC} from "react";
import StyledForm from "../reusable-styled/StyledForm.tsx";


interface RegistrationFormInterface {
    onFinishFailed: (errorInfo: object) => void;
    onFinish: (values: object) => void;
}

type FieldType = {
    username?: string;
    password?: string;
    email?: string;
};

const RegistrationForm: FC<RegistrationFormInterface> = ({onFinishFailed, onFinish}) => {

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

            <StyledForm.Item<FieldType>
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please input your email!'}]}
            >
                <Input/>
            </StyledForm.Item>

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
                        onClick={handleReset}>
                        Reset
                    </Button>
                </Flex>
            </StyledForm.Item>
        </StyledForm>
    );
};

export default RegistrationForm;