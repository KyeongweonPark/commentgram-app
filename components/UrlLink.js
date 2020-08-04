import * as React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

const Container = styled.TouchableOpacity`
  padding-right: 10px;
`;
const Text = styled.Text``;

function UrlButton({ NewsInfo }) {
  const navigation = useNavigation();
  // console.log("thisis News Info:", NewsInfo);
  const { newsurl, title, imgurl } = NewsInfo;
  return (
    <Container
      onPress={() =>
        navigation.navigate("Postpage", { newsurl, title, imgurl })
      }
    >
      <AntDesign size={30} color={styles.blackColor} name={"message1"} />
    </Container>
  );
}

export default ({ newsurl, title, imgurl }) => {
  return (
    <Container>
      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
      >
        <UrlButton NewsInfo={{ newsurl, title, imgurl }} />
      </Animatable.View>
    </Container>
  );
};
