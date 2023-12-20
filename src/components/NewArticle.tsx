import {Button, Flex, Form, Input, notification, Tag, Typography} from "antd";
import styled from "styled-components";
import type {IArticle} from "../types/articleType.ts";
import articlesStore from "../store/articlesStore.ts";
import {useNavigate} from "react-router-dom";
import {Routes} from "./router/routes.tsx";
import {useState} from "react";

type CreateArticleFieldType = Pick<IArticle, "title" | "description" | "body" | "tagList">

const {Title} = Typography;

const NewArticle = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();
  const [form] = StyledForm.useForm();

  const handleOnTagsInputPressEnter = () => {
    const newTag = form.getFieldValue("tagList").trim();
    if (!tags) {
      setTags([newTag]);
    }
    if (tags && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    form.resetFields(["tagList"]);
  };

  const handleOnTagClose = (removedTag: string) => {
    return () => {
      const newTags = tags!.filter((tag) => tag !== removedTag);
      setTags(newTags);
    };
  };

  const onFinish = (values: CreateArticleFieldType) => {
    const articleValues = {...values, tagList: tags};
    setIsDisabled(true);
    articlesStore
      .createArticle(articleValues)
      .then(() => {
        navigate(Routes.ARTICLES + articlesStore.articles[0].slug);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() =>  setIsDisabled(true));
  };

  const onFinishFailed = () => notification.error({message: "You must input all required fields"});

  const handleOnSubmit = () => form.submit();

  const handleReset = () => {
    form.resetFields();
    setTags([]);
  };

  return (
    <NewArticleWrapper
      align="center"
      justify="flex-start"
      vertical
    >
      <Title>
        New article
      </Title>
      <StyledForm
        form={form}
        autoComplete="off"
        name="basic"
        disabled={isDisabled}
        labelCol={{span: 3}}
        wrapperCol={{span: 20}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        <StyledForm.Item<CreateArticleFieldType>
          label="Title"
          name="title"
          rules={[{required: true, message: 'Please input title'}]}
        >
          <Input />
        </StyledForm.Item>

        <StyledForm.Item<CreateArticleFieldType>
          label="Description"
          name="description"
          rules={[{required: true, message: 'Please input description'}]}
        >
          <Input />
        </StyledForm.Item>

        <StyledForm.Item<CreateArticleFieldType>
          label="Body"
          name="body"
          rules={[{required: true, message: 'Please input article content'}]}
        >
          <Input.TextArea />
        </StyledForm.Item>

        <StyledForm.Item<CreateArticleFieldType>
          label="TagList"
          name="tagList"
          rules={[{required: true, message: 'Please input at least one tag'}]}
        >
          <Flex vertical gap={10}>
            <Input onPressEnter={handleOnTagsInputPressEnter} />
            {tags && (
              <TagsWrapper
                wrap="wrap"
              >
                {tags.map((tag) => (
                    <Tag
                      onClose={handleOnTagClose(tag)}
                      key={tag}
                      color="orange"
                      closable
                    >
                      {tag}
                    </Tag>
                  ))}
              </TagsWrapper>
            )}
          </Flex>
        </StyledForm.Item>
        <StyledForm.Item wrapperCol={{offset: 2}}>
          <Flex
            justify="center"
            gap={14}
          >
            <Button
              onClick={handleOnSubmit}
              type="primary"
            >
              Create Article
            </Button
 >
            <Button
              htmlType="button"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Flex>
        </StyledForm.Item>
      </StyledForm>
    </NewArticleWrapper>
  );
};

const NewArticleWrapper = styled(Flex)`
  min-height: 90vh;
  padding-top: 10vh;
`;

const StyledForm= styled(Form)`
  width: 70%;
`;

const TagsWrapper = styled(Flex)`
  width: inherit;
`;

export default NewArticle;