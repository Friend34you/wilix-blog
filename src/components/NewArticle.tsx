import type {InputRef} from "antd";
import {Button, Flex, Form, Input, notification, Typography} from "antd";
import styled from "styled-components";
import type {IArticle} from "../types/articleType.ts";
import articlesStore from "../store/articlesStore.ts";
import type {ReactNode} from "react";
import { useRef, useState} from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import TagsList from "./TagsList.tsx";
import type {Rule} from "antd/lib/form";

type CreateArticleFieldType = Pick<IArticle, "title" | "description" | "body" | "tagList">

type formItemType = {
  label: string;
  name: string;
  rules: Rule[];
  children: ReactNode
}

type NewArticleFormRules = {
  title: Rule[],
  description: Rule[],
  body: Rule[],
  tagList: Rule[]
}

const {Title} = Typography;

const rules: NewArticleFormRules = {
  title: [
    {
      required: true,
      message: "Please input title"
    },
    {
      min: 10,
      message: "min title length - 10"
    },
    {
      max: 30,
      message: "max title length - 30"
    }
  ],
  description: [
    {
      required: true,
      message: "Please input description"
    },
    {
      min: 15,
      message: "min description length - 15"
    },
    {
      max: 45,
      message: "max description length - 45"
    }
  ],
  body: [
    {
      required: true,
      message: "Please input article content"
    },
    {
      min: 60,
      message: "min article length - 60"
    }
  ],
  tagList: [
    {
      max: 15,
      message: "max tag length - 15"
    }
  ]
};

const formItems: formItemType[] = [
  {
    label: "Title",
    name: "title",
    rules: rules.title,
    children: <Input />
  },
  {
    label: "Description",
    name: "description",
    rules: rules.description,
    children: <Input />
  },
  {
    label: "Body",
    name: "body",
    rules: rules.body,
    children: <Input.TextArea />
  },
];

const NewArticle = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const [form] = StyledForm.useForm();
  const tagInput = useRef<InputRef>(null);

  const handleOnSubmit = () => form.submit();

  const handleReset = () => {
    form.resetFields();
    setTags([]);
  };

  const handleOnTagsInputPressEnter = () => {
    const newTag = form.getFieldValue("tagList").trim();
    if (!tags) {
      setTags([newTag]);
    }
    if (tags && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    tagInput.current!.focus({cursor: "all"});
  };

  const onTagClose = (removedTag: string) => {
    //Tags точно содержит как минимум один элемент, т.к.
    // функция вызывается при нажатии на иконку крестика у существующего тега
    const newTags = tags!.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const onFinish = (values: CreateArticleFieldType) => {
    const articleValues = {...values, tagList: tags};

    setIsDisabled(true);
    articlesStore
      .createArticle(articleValues)
      .then(() => {
        notification.success({message: "Article successfully created"});
        form.resetFields();
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsDisabled(false));
  };

  const onFinishFailed = () => notification.error({message: "You must input all required fields"});

  return (
    <NewArticleWrapper
      align="center"
      justify="flex-start"
      vertical
    >
      <FormWrapper
        align="center"
        vertical
      >
        <Title>
          New article
        </Title>
        <StyledForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
          name="basic"
          size="large"
          labelCol={{span: 3}}
          wrapperCol={{span: 20}}
          disabled={isDisabled}
          labelWrap
        >
          {formItems.map((formItem) => (
            <StyledForm.Item key={formItem.name} {...formItem}>
              {formItem.children}
            </StyledForm.Item>
          ))}

          <StyledForm.Item<CreateArticleFieldType>
            label="TagList"
            name="tagList"
            rules={rules.tagList}
            tooltip={{title: "By default tags is empty. To add tag type its name and press enter", icon: <InfoCircleOutlined />}}
          >
            <Flex
              gap={10}
              vertical
            >
              <Input
                onPressEnter={handleOnTagsInputPressEnter}
                placeholder="type tag name and press Enter"
                ref={tagInput}
              />
              {tags && (
                <TagsWrapper
                  wrap="wrap"
                >
                  <TagsList
                    onTagClose={onTagClose}
                    tags={tags}
                    tagsColor="magenta"
                    closable
                  />
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
      </FormWrapper>
    </NewArticleWrapper>
  );
};

const NewArticleWrapper = styled(Flex)`
  min-height: 90vh;
  padding: 10vh 0;
  background-color: #330000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2372179B'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;

  @media (max-width: 768px) {
    background: none;
  }
`;

const FormWrapper = styled(Flex)`
  padding: 15px;
  width: 70%;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(34, 60, 80, 0.2);
  border-radius: 8px;

  @media (max-width: 1024px) {
    width: 90%;
  }
  
  @media (max-width: 768px) {
    box-shadow: none;
    padding: 0;
    width: 100%;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  background-color: white;
  border-radius: 6px;
`;

const TagsWrapper = styled(Flex)`
  width: inherit;
`;

export default NewArticle;