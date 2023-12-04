import {FC} from "react";
import {Avatar, Button, Card, Space, Typography} from "antd";
import styled from "styled-components";

const mockData = {
  "_id": {
    "$oid": "65686221e559d71074141f94"
  },
  "slug": "Try-to-transmit-the-HTTP-card-maybe-it-will-override-the-multi-byte-hard-drive!-120863",
  "title": "Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!",
  "description": "Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non.",
  "body": "Sunt excepturi ut dolore fuga.\\nAutem eum maiores aut nihil magnam corporis consectetur sit. Voluptate et quasi optio eos et eveniet culpa et nobis.\\nSint aut sint sequi possimus reiciendis nisi.\\nRerum et omnis et sit doloribus corporis voluptas error.\\nIusto molestiae tenetur necessitatibus dolorem omnis. Libero sed ut architecto.\\nEx itaque et modi aut voluptatem alias quae.\\nModi dolor cupiditate sit.\\nDelectus consectetur nobis aliquid deserunt sint ut et voluptas.\\nCorrupti in labore laborum quod. Ipsa laudantium deserunt. Ut atque harum inventore natus facere sed molestiae.\\nQuia aliquid ut.\\nAnimi sunt rem et sit ullam dolorem ab consequatur modi. Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et. Et fuga repellendus magnam dignissimos eius aspernatur rerum. Quo perferendis nesciunt.\\nDolore dolorem porro omnis voluptatibus consequuntur et expedita suscipit et.\\nTempora facere ipsa.\\nDolore accusamus soluta officiis eligendi.\\nEum quaerat neque eum beatae odio. Ad voluptate vel.\\nAut aut dolor. Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et.",
  "tagList": [
    "voluptate",
    "rerum",
    "ducimus",
    "hic"
  ],
  "createdAt": "2022-12-09T13:46:24.264Z",
  "updatedAt": "2022-12-09T13:46:24.264Z",
  "favorited": false,
  "favoritesCount": 2261,
  "author": {
    "username": "Anah Benešová",
    "bio": null,
    "image": "https://api.realworld.io/images/demo-avatar.png",
    "following": false
  }
}

const {Text, Title} = Typography

const StyledCard = styled(Card)`
  max-width: 550px;
  background-color: lightyellow;
  
`

const ArticleCard: FC = () => {
  return (

    <StyledCard hoverable>
      <Space
        align={"center"}
      >
        <Avatar>
        </Avatar>
        <Text>
          username
        </Text>
        <Text>
          11:02:2022
      </Text>
        <Button>
          Follow
        </Button>
      </Space>

      <Title level={3}>Article title</Title>
      <Text>

      </Text>

    </StyledCard>
  );
};

export default ArticleCard;
