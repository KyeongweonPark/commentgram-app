import React, { useState } from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import NewsList from "../../components/NewsList";
// import Post from "../../components/Post";

export const UPDATENEWSES_QUERY = gql`
  {
    updateNewses {
      id
      title
      newsurl
      imgurl
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

export default ({ navigation }) => {
  navigation.setOptions({
    headerShown: false,
  });

  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(UPDATENEWSES_QUERY);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.updateNewses &&
          data.updateNewses.map((news) => <NewsList key={news.id} {...news} />)
        )}
      </ScrollView>
    </View>
  );
};
