import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TitleText = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-size: 40px;
  font-weight: 600;
`;

const Container = styled.View`
  margin-bottom: 50px;
`;

const ContainerBottom = styled.View`
  margin-bottom: 150px;
`;

// export default ({ navigation }) => {
//     const confirmInput = useInput("");
//     const logIn = useLogIn();
//     const [loading, setLoading] = useState(false);
//     const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
//       variables: {
//         secret: confirmInput.value,
//         email: navigation.getParam("email"),
//       },
//     });
export default ({ route, navigation }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: route.params.email,
    },
  });

  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }

    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("Incorrect secret code");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
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
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
        <ContainerBottom></ContainerBottom>
      </View>
    </TouchableWithoutFeedback>
  );
};
