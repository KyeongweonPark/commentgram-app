import React, { useState, useRef } from "react";
import styled from "styled-components";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import UrlLink from "../../components/UrlLink";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles";

const NEWSURL = "https://entertain.daum.net/";

export const CRAWLNEWSDAUM = gql`
  query crawlNewsDaum($newsurl: String!) {
    crawlNewsDaum(newsurl: $newsurl) {
      id
      title
      newsurl
      imgurl
    }
  }
`;

const TouchableOpacityButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

const View = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.whiteColor};
`;

const IconView = styled.View`
  padding-right: 20px;
`;

const HeaderLeftContainer = styled.View`
  flex-direction: row;
  width: 65px;
  justify-content: flex-end;
`;

export default ({ navigation }) => {
  const [currentUrl, setCurrentUrl] = useState(NEWSURL);
  const [currentTitle, setCurrentTitle] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [key, setKey] = useState(0);
  const webviewRef = useRef(null);
  const [getInfo, { loading, data }] = useLazyQuery(CRAWLNEWSDAUM);
  let { newsurl, title } = { currentUrl, currentTitle };
  let imgurl = "";

  const navigationUrl = useNavigation();

  const backButtonHandler = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      webviewRef.current.reload();
    }
  };

  const homeButtonHandler = () => {
    setCurrentUrl(NEWSURL);
    setCurrentTitle("다음 연예");
    setKey(key + 1);
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  };

  navigation.setOptions({
    headerLeft: () => (
      <HeaderLeftContainer>
        <TouchableOpacityButton onPress={homeButtonHandler}>
          <AntDesign size={25} color={styles.blackColor} name={"home"} />
        </TouchableOpacityButton>
      </HeaderLeftContainer>
    ),
  });

  const updateState = async (navState) => {
    await getInfo({
      variables: { newsurl: navState.url },
      fetchPolicy: "network-only",
    });

    if (data && data.crawlNewsDaum) {
      newsurl = data.crawlNewsDaum[0].newsurl;
      title = data.crawlNewsDaum[0].title;
      imgurl = data.crawlNewsDaum[0].imgurl;
      // console.log(newsurl, title, imgurl);
    }

    navigation.setOptions({
      title:
        navState.title.length > 15
          ? navState.title.slice(0, 15) + "..."
          : navState.title,
      headerLeft: () => (
        <HeaderLeftContainer>
          {navState.url == NEWSURL ||
          navState.url  == "https://entertain.daum.net" ? null : (
            <TouchableOpacityButton onPress={backButtonHandler}>
              <AntDesign size={25} color={styles.blackColor} name={"left"} />
            </TouchableOpacityButton>
          )}
          <TouchableOpacityButton onPress={homeButtonHandler}>
            <AntDesign size={25} color={styles.blackColor} name={"home"} />
          </TouchableOpacityButton>
        </HeaderLeftContainer>
      ),
      headerRight: () =>
        imgurl == "" ? (
          <IconView>
            <AntDesign
              size={30}
              color={styles.darkGreyColor}
              name={"message1"}
            />
          </IconView>
        ) : newsurl.slice(0, 31) == "https://entertain.v.daum.net/v/" ||
          newsurl.slice(0, 26) == "https://news.v.daum.net/v/" ? (
          UrlLink({ newsurl, title, imgurl })
        ) : (
          <IconView>
            <AntDesign
              size={30}
              color={styles.darkGreyColor}
              name={"message1"}
            />
          </IconView>
        ),
    });
  };

  return (
    <View>
      <WebView
        key={key}
        ref={webviewRef}
        source={{ uri: NEWSURL }}
        onNavigationStateChange={(navState) => {
          updateState(navState);
        }}
        onLoadEnd={null}
      />
    </View>
  );
};
