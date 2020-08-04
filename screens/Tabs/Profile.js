import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";
import styles from "../../styles";

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
      reportingCount
      fullName
      createdAt
      isSelf
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.theme.whiteColor};
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: "network-only",
  });
  navigation.setOptions({
    title: "내 계정",
  });

  return (
    <View>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </View>
  );
};
