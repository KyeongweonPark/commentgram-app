import React, { useEffect, useState, useRef } from "react";
import { WebView } from "react-native-webview";
import { YellowBox } from "react-native";
import Loader from "../components/Loader";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import UrlLink from "../components/UrlLink";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";

console.ignoredYellowBox = true;

export const CRAWLNEWS = gql`
  query crawlNews($newsurl: String!) {
    crawlNews(newsurl: $newsurl) {
      id
      title
      newsurl
      imgurl
    }
  }
`;

export default ({ route, navigation }) => {
  let { newsurl, title, imgurl } = route.params;
  let original_newsurl = newsurl;
  const [currentUrl, setCurrentUrl] = useState(newsurl);
  const webviewRef = useRef(null);

  const { data, loading, refetch } = useQuery(CRAWLNEWS, {
    variables: { newsurl: currentUrl },
    fetchPolicy: "network-only",
  });
  if (data && data.crawlNews) {
    newsurl = data.crawlNews[0].newsurl;
    title = data.crawlNews[0].title;
    imgurl = data.crawlNews[0].imgurl;
    console.log(newsurl, title, imgurl);

  }
  navigation.setOptions({
    headerRight: () => UrlLink({ newsurl, title, imgurl }),
  });

  return (
    <WebView
      source={{ uri: original_newsurl }}
      ref={webviewRef}
      onNavigationStateChange={(navState) => {
        // setCurrentTitle(navState.title);
        setCurrentUrl(navState.url);
      }}
      onLoadEnd={null}
    />
  );
};
