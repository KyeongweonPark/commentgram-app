import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../components/UserProfile";
import styles from "../styles";

export const SEEUSER = gql`
  query seeUser($userId: String!) {
    seeUser(userId: $userId) {
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
  const { id } = route.params;
  const { data, loading } = useQuery(SEEUSER, {
    variables: {
      userId: id,
    },
    fetchPolicy: "network-only",
    });

  return (
    // <View>
    //   <Text>userpage</Text>
    //   <Text>id: {id}</Text>
    // </View>
    <View>

        {loading ? <Loader /> : data.seeUser && data.seeUser && <UserProfile {...data.seeUser} />}

    </View>
  );
};
