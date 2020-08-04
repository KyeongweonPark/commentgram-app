import React, { useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import constants from "../constants";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import useInput from "../hooks/useInput";
import CommentInput from "./CommentInput";
import CommentButton from "./CommentButton";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles";
import PostPresenter from "./PostPresenter";
import Loader from "./Loader";
import { Text } from "react-native";

export const SEEPOST = gql`
  query seePost($postId: String!) {
    seePost(id: $postId) {
      id
      description
      createdAt
      user{
        username
      }
      comments {
        id
        text
        user {
          username
        }
        createdAt
      }
      isUp
      isDown
      UpCount
      DownCount
      CommentCount
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  width: 95%;
`;

const PostContainer = styled.View`
  margin-top: 20px;
  margin-left: 10px;
  width: ${constants.width / 1.1}px;
`;

export default ({ id, createdAt, description, user }) => {
  const navigation = useNavigation();
  const [loading2, setLoading] = useState(false);
  const { data, loading, refetch } = useQuery(SEEPOST, {
    variables: { postId: id },
  });

  return (
    <View>
      <PostContainer>
        {data && data.seePost && <Text key={id}>{id}</Text>}
        {/* <PostPresenter key={data.seePost.id} {...data.seePost} /> */}
        {/* <Text key={data.seePost.id}> {console.log(data.seePost.comments)}</Text> */}
      </PostContainer>
    </View>
  );
};
