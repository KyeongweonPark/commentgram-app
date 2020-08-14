import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  display:flex;
  justify-content: center;
  align-items: center;
  flex: 1;

`;

const TitleText = styled.Text`
  color:${props=>props.theme.blackColor};
  font-size:40px;
  /* font-style:italic; */
  font-weight:600;
`;


const Container = styled.View`
  margin-bottom: 10px;
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
    <Image style= {{resizeMode:"contain", height:400, width:400}} source={require("../../assets/mainlogo.png")} />

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
