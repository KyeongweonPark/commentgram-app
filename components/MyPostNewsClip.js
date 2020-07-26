import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;



export default ({
  id,
  newsurl,
  imgurl,
  title,
  createdAt,
  updatedAt,
}) => {
  const navigation = useNavigation();
  return (
    
    <View>
      <Text>{id}</Text>
      <Text>{newsurl}</Text>
      <Text>{title}</Text>
    </View>
  );
};
