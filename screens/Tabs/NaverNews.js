import React, { useState, useRef } from "react";
import styled from "styled-components";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import UrlLink from "../../components/UrlLink";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles";

const NEWSURL = "https://m.entertain.naver.com/home";

export const CRAWLNEWSNAVER = gql`
  query crawlNewsNaver($newsurl: String!) {
    crawlNewsNaver(newsurl: $newsurl) {
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

let currentUrl2 = NEWSURL;

export default ({ navigation }) => {
  const [currentUrl, setCurrentUrl] = useState(NEWSURL);
  const [currentTitle, setCurrentTitle] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [key, setKey] = useState(0);
  const webviewRef = useRef(null);
  const [getInfo, { loading, data }] = useLazyQuery(CRAWLNEWSNAVER);
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
    setCurrentTitle("네이버 TV연예");
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
    // setCurrentTitle(navState.title);
    //   setCurrentUrl(navState.url);
    // setCanGoBack(navState.canGoBack);
    //  changeState(navState);

    // console.log("changed url:", navState.url);

    await getInfo({
      variables: { newsurl: navState.url },
      fetchPolicy: "network-only",
    });

    if (data && data.crawlNewsNaver) {
      newsurl = data.crawlNewsNaver[0].newsurl;
      title = data.crawlNewsNaver[0].title;
      imgurl = data.crawlNewsNaver[0].imgurl;
      // console.log("result", newsurl, title, imgurl);
    }

    navigation.setOptions({
      title:
        navState.title.length > 15
          ? navState.title.slice(0, 15) + "..."
          : navState.title,
      headerLeft: () => (
        <HeaderLeftContainer>
          {navState.url == NEWSURL ||
          navState.url == "https://entertain.naver.com/home" ? null : (
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
        ) : newsurl.slice(0, 25) == "https://n.news.naver.com/" ? (
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
        // navigation.navigate("Webpage", { newsurl:navState.url });

        onLoadEnd={null}
      />
    </View>
  );
};
