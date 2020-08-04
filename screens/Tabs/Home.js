import React, { useState } from "react";
import { ScrollView, RefreshControl, Text, LogBox } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import NewsList from "../../components/NewsList";

export const NEWSES_QUERY = gql`
  query seeNewses($offset: Int!, $limit: Int!) {
    seeNewses(offset: $offset, limit: $limit) {
      id
      newsurl
      imgurl
      title
      PostCount
      createdAt
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-top: 10px;
  background-color: ${(props) => props.theme.whiteColor};
`;

export default ({ navigation }) => {
  navigation.setOptions({
    title: "새 댓글",
  });
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch, fetchMore } = useQuery(NEWSES_QUERY, {
    variables: {
      offset: 0,
      limit: 20,
    },
    fetchPolicy: "network-only",
  });

  const onLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: data.seeNewses.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeNewses: [...prev.seeNewses, ...fetchMoreResult.seeNewses],
        });
      },
    });
  };

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
        onMomentumScrollEnd={() => {
          onLoadMore();
        }}
      >
        {data &&
          data.seeNewses &&
          data.seeNewses.map((news, index) => <NewsList key={index} {...news} />)}
      </ScrollView>
    </View>

    
  );
};
