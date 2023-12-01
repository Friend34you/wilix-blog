import {Divider, Flex, Typography} from "antd";
import RegistrationForm from "./RegistrationForm.tsx";


const {Title} = Typography


const Registration = () => {

    const onFinish = (values: object) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: object) => {
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
            <RegistrationForm
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </Flex>
    );
};

export default Registration;