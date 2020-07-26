import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 1.2}px;
  height: 100px;
  text-align: left;
  textAlignVertical: top; /* For Android Prop */

  padding: 10px;
  background-color: ${(props) => props.theme.greyColor};
  border: 1px solid ${(props) => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const PostInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "default",
  onSubmitEditing = () => null,
  autoCorrect = true,
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      multiline={true}
      maxLength={200}
      // onFocus={}
    />
  </Container>
);

PostInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["default", "done", "go", "next", "search", "send"]),
  oneSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
};

export default PostInput;
