import React from "react";
import styled from "styled-components";
import MyPost from "./MyPost";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MyPostView = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
`;

const Text = styled.Text``;

export default ({
  id,
  username,
  email,
  bio,
  postsCount,
  commentsCount,
  reportersCount,
  fullName,
  posts,
}) => {

  return (
  <View>
    <Text>{id}</Text>
    <Text>{username}</Text>
    <Text>{email}</Text>
    <Text>{bio}</Text>
    <Text>{postsCount}</Text>
    <Text>{commentsCount}</Text>
    <Text>{reportersCount}</Text>
    <Text>{fullName}</Text>
    <MyPostView>
      {posts && posts.map((p) => <MyPost key={p.id} {...p} />)}
    </MyPostView>
  </View>
);
  }
