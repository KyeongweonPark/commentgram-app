import * as React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity`
  padding-right: 10px;
`;
const Text = styled.Text``;


function UrlButton({NewsInfo}) {
  const navigation = useNavigation();
  // console.log("thisis News Info:", NewsInfo);
  const {newsurl, title, imgurl } = NewsInfo;
  return (
    <Container
      onPress={() => navigation.navigate("Postpage",{newsurl, title, imgurl })}
    >
      <AntDesign size={30} color={styles.blackColor} name={"message1"} />
    </Container>
  );
}

export default ({newsurl, title, imgurl }) => {
 
  return (
    <Container>
      <UrlButton NewsInfo={{newsurl, title, imgurl }}/>
    </Container>
  );
};
