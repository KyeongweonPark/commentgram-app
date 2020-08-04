import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
import * as Animatable from 'react-native-animatable';
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles";

const View = styled.View`
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

export default ({ route, navigation }) => {
  const emailInput = useInput(route.params?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
    },
  });
  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("Email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Provide an Email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("Email is not valid");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert("메일함에서 인증 코드를 확인하세요.");
        navigation.navigate("Confirm", {email: value});
      } else {
        Alert.alert("계정을 찾을 수 없습니다.");
        navigation.navigate("Signup" ,{email:value});
      }
    } catch (e) {
      // console.log(e);
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleLogin} text="로그인" />
        <ContainerBottom></ContainerBottom>
      </View>
    </TouchableWithoutFeedback>
  );
};
