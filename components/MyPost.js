import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import MyPostNewsClip from "./MyPostNewsClip";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MyPostNewsView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;


const Text = styled.Text``;

export default ({
  id,
  newsurl,
  description,
  comments,
  postreports,
  isUp,
  isDown,
  UpCount,
  DownCount,
  CommentCount,
  createdAt,
  updatedAt,
}) => {
  const navigation = useNavigation();
  return (
    
    <View>
      <Text>PostID: {id}</Text>
      <Text>NewsID: {newsurl.id}</Text>
      <Text>NewsTitle: {newsurl.title}</Text>
      <Text>NewsURL: {newsurl.newsurl}</Text>
      <Text>NewsIMG: {newsurl.imgurl}</Text>
      {/* <MyPostNewsView>
      {newsurl && newsurl.map((n) => <MyPostNewsClip key={n.id} {...n} />)}
    </MyPostNewsView> */}
      <Text>댓글내용: {description}</Text>
      <Text>대댓글수: {CommentCount}</Text>
      <Text>업: {UpCount}</Text>
      <Text>다운: {DownCount}</Text>
    </View>
  );
};
