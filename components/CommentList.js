import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import moment from "moment";
import "moment/min/locales";

const CommentContainer = styled.View`
  padding-top: 10px;
  padding-left: 20px;
`;
const Touchable = styled.TouchableOpacity``;
const CommentHeaderContainer = styled.View`
  flex-direction: row;
 
`;

const CommentUserName = styled.Text`
  font-weight: 500;

`;
const CommentCreatedAt = styled.Text`
  color: grey;
  margin-left: 10px;
`;
const CommentText = styled.Text``;

export default ({ id, text, user = [], createdAt, }) => {
  const userid = user.id;
  const navigation = useNavigation();
  moment.locale('ko');
  
  return (
    <CommentContainer>
      <CommentHeaderContainer>
        <Touchable
          onPress={() => navigation.navigate("Userpage", { id: userid })}
        >
          <CommentUserName>{user.username}</CommentUserName>
        </Touchable>
        <CommentCreatedAt>{moment(createdAt).fromNow()}</CommentCreatedAt>
      </CommentHeaderContainer>
      <CommentText>{text}</CommentText>
    </CommentContainer>
  );
};
