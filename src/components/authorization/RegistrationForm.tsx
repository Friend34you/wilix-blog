import {Button, Flex, Form, Input} from "antd";
import {FC} from "react";

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

    const [form] = Form.useForm()

    const handleReset = () => form.resetFields()

    return (
        <Form
            name="basic"
            labelCol={{span: 7}}
            wrapperCol={{span: 17}}
            form={form}
            style={{maxWidth: 500}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please input your email!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>


            <Form.Item wrapperCol={{offset: 2}}>
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
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;