import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5}px;
  margin-bottom: 20px;
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
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <AuthButton text={"새로운 계정 만들기"} onPress={() => navigation.navigate("Signup")} />
    <Touchable onPress={()=>navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>로그인</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
