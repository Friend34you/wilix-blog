import {Divider, Flex, Typography} from "antd";
import AuthForm from "./AuthForm.tsx";
import {FieldType} from "./authTypes.ts";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";

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
            align={"center"}
            vertical={true}
        >
            <Title>
                Registration
            </Title>
            <Divider/>
            <AuthForm
                type={"registration"}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </Flex>
    );
};

export default Registration;