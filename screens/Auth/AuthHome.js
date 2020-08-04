import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import * as Animatable from 'react-native-animatable';
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles";

const View = styled.View`
  display:flex;
  justify-content: center;
  align-items: center;
  flex: 1;

`;

const TitleText = styled.Text`
  color:${props=>props.theme.blackColor};
  font-family: Snell Roundhand;
  font-size:40px;
  font-weight:600;
`;


const Container = styled.View`
  margin-bottom: 50px;
`;

const ContainerBottom = styled.View`
  margin-bottom: 150px;
`;


const Touchable = styled.TouchableOpacity``;


const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color:${props=>props.theme.blueColor};
  margin-top: 20px;
  font-weight:600;
`;

export default ({ navigation }) => (
  <View>
    <Container>
      <TitleText>Commentagram</TitleText>
    </Container>
    <Container>
      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
      >
         <AntDesign size={80} color={styles.blackColor} name={"message1"} />
      </Animatable.View>
    </Container>
    <AuthButton text={"새로운 계정 만들기"} onPress={() => navigation.navigate("Signup")} />
    <Touchable onPress={()=>navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>로그인</LoginLinkText>
      </LoginLink>
    </Touchable>
    <ContainerBottom></ContainerBottom>
  </View>
);
