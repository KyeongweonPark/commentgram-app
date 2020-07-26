import React from "react";
import styled from "styled-components";
import constants from "../constants";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.lightGreyColor};
  padding: 7px;
  margin: 0px 5px;
  border-radius: 4px;
  width: 60px;
`;
const Text = styled.Text`
  color: black;
  text-align: center;
`;

const CommentButton = ({ text, onPress, loading = false, bgColor = null }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

CommentButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default CommentButton;
