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
  const [key, setKey] = useState(0);
  let { newsurl, title, imgurl } = route.params;
  const NEWSURL = newsurl;
  const [currentUrl, setCurrentUrl] = useState(newsurl);
  const webviewRef = useRef(null);

  return (
    <WebView
      key={key}
      source={{ uri: NEWSURL }}
      ref={webviewRef}
      onNavigationStateChange={(navState) => {
        // setCurrentTitle(navState.title);
        // setCurrentUrl(original_newsurl);
        // homeButtonHandler();
        setCurrentUrl(NEWSURL);
      }}
      onLoadEnd={null}
    />
  );
};
