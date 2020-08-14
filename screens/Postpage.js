import React, { useState } from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
import { YellowBox } from "react-native";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { useQuery, useMutation } from "react-apollo-hooks";
import styles from "../styles";
import PostDetail from "../components/PostDetail";
import styled from "styled-components";

YellowBox.ignoreWarnings(["Can't open url: about:srcdoc"]);

export const SEARCHBYURL = gql`
  query UrlSearch($newsurl: String!) {
    UrlSearchNews(newsurl: $newsurl) {
      id
      title
      newsurl
      imgurl
      createdAt
      PostCount
    }
  }
`;

export const ADDNEWS = gql`
  mutation addNews(
    $newsurl: String!
    $title: String
    $detail: String
    $imgurl: String
  ) {
    addNews(
      newsurl: $newsurl
      title: $title
      detail: $detail
      imgurl: $imgurl
    ) {
      id
      title
      newsurl
      imgurl
    }
  }
`;

const View = styled.View`
  /* background-color: white; */
`;

export default ({ route, navigation }) => {
  const { newsurl, imgurl, title } = route.params;
  const { detail } = "";
  const [refreshing, setRefreshing] = useState(false);
  const [checkNews, setCheckNews] = useState(false);
  const [loading2, setLoading] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCHBYURL, {
    variables: {
      newsurl,
    },
    fetchPolicy: "network-only",
  });
  const [addNewsMutation] = useMutation(ADDNEWS, {
    skip: checkNews,
    variables: {
      newsurl,
      imgurl,
      title,
      detail,
    },
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { newsurl } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  const checkExsiting = async () => {
    try {
      await refetch({ variables: { newsurl } });
      if (data.UrlSearchNews == "") {
        const {
          data: { addNews },
        } = await addNewsMutation();
        // setCheckNews(true);
      }
    } catch (e) {
      setCheckNews(false);
    } finally {
      setCheckNews(true);
      setLoading(false);
    }
  };
  if (checkNews == false) {
    checkExsiting();
  }

  return (
    <View>
      {loading2 ? (
        <Loader />
      ) : loading == true ? (
        <Loader />
      ) : (
        data &&
        data.UrlSearchNews &&
        data.UrlSearchNews.map((news) => (
          <PostDetail
            key={news.id}
            id={news.id}
            newsurl={news.newsurl}
            imgurl={news.imgurl}
            title={news.title}
            PostCount={news.PostCount}
            createdAt={news.createdAt}
            onRefresh={onRefresh}
            refreshing={refreshing}
            refetch={refetch}
          />
        ))
      )}
    </View>
  );
};
