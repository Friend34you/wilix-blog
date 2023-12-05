import {Divider, Flex, Typography} from "antd";
import AuthForm from "./AuthForm.tsx";
import type {FieldType} from "./authTypes.ts";
import type {ValidateErrorEntity} from "rc-field-form/lib/interface";

const {Title} = Typography

const Registration = () => {

    const onFinish = (values: FieldType) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        console.log('Failed:', errorInfo);
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                type="registration"
            />
        </Flex>
    );
};

export default Registration;