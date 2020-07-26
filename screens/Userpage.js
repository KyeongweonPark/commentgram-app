import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../components/UserProfile";
import styles from "../styles";

export const ME = gql`
  {
    me {
      id
      username
      email
      bio
      postsCount
      commentsCount
      reportersCount
      fullName
      posts
      {
        id
        description
        CommentCount
        UpCount
        DownCount
        newsurl{
          id
          title
          newsurl
          imgurl
        }
      }
      createdAt
    }
  }
`;

const View = styled.View`
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.theme.whiteColor};
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  // const { data, loading } = useQuery(ME);
  const {id} = route.params;
  console.log(id);
  return (
    <View>
    {/* <ScrollView style={{ backgroundColor: styles.whiteColor, paddingTop: 100,}} contentContainerStyle={{alignSelf:"flex-start"}}>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
      
    </ScrollView> */}
    <Text>userpage</Text>
    <Text>id: {id}</Text>
    </View>
  );
};
