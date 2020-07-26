import React, { useState } from "react";
import { Image, Platform, Text } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import constants from "../constants";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import NavIcon from "./NavIcon";

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View`
  width: 100%;
  margin-left: 20px;
  flex-wrap: wrap;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity`
  align-items: center;
`;

const TouchableTitle = styled.TouchableOpacity``;

const HeaderThumbnailContainer = styled.View`
  width: 10%;
`;
const HeaderUserContainer = styled.View`
  width: 65%;
  margin-left: 20px;
`;
const HeaderPostContainer = styled.View`
  width: 10%;
  margin-left: 10px;
  align-items: center;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

{
  /* <Image resizeMode={"contain"} source={require("../../assets/logo.png")} /> */
}


const NewsList = ({
  id,
  title = "",
  imgurl = "",
  newsurl = "http://daum.net",
  PostCount = -1,
}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <HeaderThumbnailContainer>
          <Touchable
            onPress={() => navigation.navigate("Webpage", { newsurl })}
          >
            {(imgurl == "") | (imgurl === undefined) ? (
              <Image
                resizeMode={"contain"}
                style={{ height: 30, width: 30 }}
                source={require("../assets/newspaper.png")}
              />
            ) : (
              <Image
                style={{ height: 50, width: 50, borderRadius: 30 }}
                source={{ uri: imgurl }}
              />
            )}
          </Touchable>
        </HeaderThumbnailContainer>

        <HeaderUserContainer>
          <TouchableTitle
            onPress={() =>
              navigation.navigate("Webpage", { newsurl, title, imgurl })
            }
          >
            <Bold>
              <Text>{title}</Text>
            </Bold>
            <Location>{newsurl}</Location>
          </TouchableTitle>
        </HeaderUserContainer>
        <HeaderPostContainer>
          <Touchable
            onPress={() =>
              navigation.navigate("Postpage", { newsurl, title, imgurl })
            }
          >
            <AntDesign size={30} color={styles.blackColor} name={"message1"} />
            {PostCount == -1 ? null : <Text>{PostCount}</Text>}
          </Touchable>
        </HeaderPostContainer>
      </Header>
      <InfoContainer>
        {/* <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes `}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption> */}
        {/* <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable> */}
      </InfoContainer>
    </Container>
  );
};

NewsList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  imgurl: PropTypes.string,
  newsurl: PropTypes.string.isRequired,
};

export default NewsList;
