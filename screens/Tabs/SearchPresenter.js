import React, { useState } from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import SquarePhoto from "../../components/SquarePhoto";
import styles from "../../styles";

const View = styled.View`
  display: flex;
  flex-wrap : wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const SearchPresenter = ({ term }) => {
  if (!term) {
    term = "";
  }
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    fetchPolicy: "network-only",
  });
  //   console.log(data, loading);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      style={{ backgroundColor: styles.whiteColor }}
    >
      <View>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map((post) => <SquarePhoto key={post.id} {...post} />)
      )}
      </View>
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
};

export default SearchPresenter;
