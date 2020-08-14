import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import MyPostNewsClip from "./MyPostNewsClip";
import { Image, Alert } from "react-native";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles";
import constants from "../constants";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import CommentButton from "./CommentButton";
import useInput from "../hooks/useInput";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import moment from "moment";
import "moment/min/locales";
import { useLazyQuery } from "@apollo/react-hooks";

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
        text
        user {
          id
          username
        }
        createdAt
    }
  }
`;

const View = styled.View`
  align-items: center;
  flex: 1;
`;

const MyPostNewsView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const NewsThumbnailContainer = styled.View`
  flex: 1.2;
  display: flex;
  padding-right: 10px;
`;

const NewsContainer = styled.View`
  flex: 6;
  flex-wrap: wrap;
`;

const NewsMessageContainer = styled.View`
  flex: 1.2;
  display: flex;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  width: ${constants.width / 1.1}px;
  padding: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity`
  flex: 1;
  align-self: center;
  align-content: center;
`;

const NewsMessageTouchable = styled.TouchableOpacity`
  align-self: center;
  display: flex;
  align-items: center;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Time = styled.Text`
  font-size: 12px;
  color: grey;
`;

const Text = styled.Text``;

const PostContainer = styled.View`
  padding-top: 10px;
  margin-left: 10px;
  width: ${constants.width / 1.1}px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-bottom-width: 1px;
`;

const PostHeader = styled.View`
  flex-direction: row;
  /* justify-content: space-between; */
`;

const PostUserName = styled.Text`
  flex: 1;
  color: ${(props) => props.theme.blueColor};
  font-weight: 700;
`;

const PostTimeStamp = styled.Text`
  color: gray;
`;

const PostBold = styled.Text`
  font-weight: 500;
`;

const ReportIconContainer = styled.TouchableOpacity`
  flex: 0.5;
  justify-content: center;
`;

const PostReport = styled.Text`
  flex: 0.5;
  color: black;
  align-self: center;
  text-align: left;
`;

const PostContentContainer = styled.View`
  padding-top: 10px;
`;

const PostContent = styled.Text`
  text-align: left;
`;

const PostStatusContainer = styled.View`
  padding-top: 10px;
  flex-direction: row;
`;

const PostStatusComment = styled.View`
  flex: 2;
`;

const PostStatusBlank = styled.View`
  flex: 5;
`;
const PostStatusCommentTouchable = styled.TouchableOpacity``;

const PostStatusUp = styled.View`
  flex: 1.5;
  flex-direction: row;
`;

const UpIconContainer = styled.View``;

const DownIconContainer = styled.View``;

const PostStatusDown = styled.View`
  flex: 1.5;
  flex-direction: row;
`;

const PostStatusText = styled.Text`
  font-size: 12px;
  margin-left: 3px;
`;

const PostStatusUpText = styled.Text`
  font-size: 12px;
  margin-left: 3px;
  color: ${(props) => props.theme.upColor};
`;

const PostStatusDownText = styled.Text`
  font-size: 12px;
  margin-left: 3px;
  color: ${(props) => props.theme.downColor};
`;

const CommentContainer = styled.View`
  margin-top: 10px;
`;

const CommentTextContainer = styled.View``;

const AddCommentContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  align-self: center;
`;

const CommentButtonContainer = styled.View`
  align-self: flex-end;
`;



export default ({
  id,
  newsurl,
  description,
  comments,
  UpCount,
  DownCount,
  CommentCount,
  createdAt,
  PostReportCount,
  refetch,
}) => {
  const navigation = useNavigation();
  const me_newsurl = newsurl.newsurl;
  const imgurl = newsurl.imgurl;
  const title = newsurl.title;
  const newscreatedAt = newsurl.createdAt;
  const postcount = newsurl.postcount;
  // const username = user.username;
  moment.locale("ko");
  const [comment, setComment] = useState(false);
  const [selfComments, setSelfComments] = useState([]);
  const [commentCountS, setCommentCount] = useState(CommentCount);

  const toggleComment = async () => {
    if (comment == false) {
      // await getComments();
      setSelfComments([]);
      refetch();
    }
    setComment((Flag) => !Flag);
  };

  const commentInput = useInput("");
  const [commentloading, setCommentloading] = useState(false);

  // const [getComments, { loading, data }] = useLazyQuery(SEEPOSTCOMMENTS, {
  //   variables: { postId: id },
  // });

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { text: commentInput.value, postId: id },
  });

  const handleNewComment = async () => {
    const { value: text } = commentInput;

    if (text === "") {
      return Alert.alert("의견을 입력해 주세요.");
    }

    try {
      setCommentloading(true);
      const {
        data: { addComment },
      } = await addCommentMutation();
      setSelfComments([...selfComments, addComment]);
      setCommentCount((l) => l + 1);
      // await refetch();
      commentInput.setValue("");
    } catch (e) {
      console.log(e);
      Alert.alert("업로드 도중 오류가 발생했습니다.", "다시 시도하기");
    } finally {
      setCommentloading(false);
    }
    return null;
  };

  return (
    <View>
      <HeaderContainer>
        <NewsThumbnailContainer>
          <Touchable
            onPress={() =>
              navigation.navigate("Webpage", { newsurl: me_newsurl })
            }
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
        </NewsThumbnailContainer>
        <NewsContainer>
          <Touchable
            onPress={() =>
              navigation.navigate("Webpage", {
                newsurl: me_newsurl,
                title,
                imgurl,
              })
            }
          >
            <Bold>
              <Text>{title}</Text>
            </Bold>
            <Time>{moment(newscreatedAt).calendar()}</Time>
          </Touchable>
        </NewsContainer>
        <NewsMessageContainer>
          <NewsMessageTouchable
            onPress={() =>
              navigation.navigate("Postpage", {
                newsurl: me_newsurl,
                title,
                imgurl,
              })
            }
          >
            <AntDesign size={30} color={styles.blackColor} name={"message1"} />
            {postcount == -1 ? null : <Text>{postcount}</Text>}
          </NewsMessageTouchable>
        </NewsMessageContainer>
      </HeaderContainer>

      <PostContainer>
        <PostHeader>
          {PostReportCount < 100 ? (
            <PostBold>
              <PostTimeStamp>{moment(createdAt).fromNow()}</PostTimeStamp>
              {" " + description}
            </PostBold>
          ) : (
            <PostBold>
              <PostTimeStamp>{moment(createdAt).fromNow()}</PostTimeStamp>
              <PostTimeStamp>
                {" " + "네티즌의 신고로 블라인드 처리되었습니다."}
              </PostTimeStamp>
            </PostBold>
          )}
        </PostHeader>
        <PostStatusContainer>
          <PostStatusComment>
            <PostStatusCommentTouchable onPress={toggleComment}>
              {commentCountS == 0 ? (
                <PostStatusText>답글작성</PostStatusText>
              ) : (
                <PostStatusText>답글: {commentCountS}</PostStatusText>
              )}
            </PostStatusCommentTouchable>
          </PostStatusComment>
          <PostStatusBlank></PostStatusBlank>
          <PostStatusUp>
            <UpIconContainer>
              <FontAwesome5
                name="thumbs-up"
                size={14}
                color={styles.blackColor}
              />
            </UpIconContainer>
            <PostStatusUpText>{UpCount}</PostStatusUpText>
          </PostStatusUp>
          <PostStatusDown>
            <DownIconContainer>
              <FontAwesome5
                name="thumbs-down"
                size={14}
                color={styles.blackColor}
              />
            </DownIconContainer>
            <PostStatusDownText>{DownCount}</PostStatusDownText>
          </PostStatusDown>
        </PostStatusContainer>
        <CommentContainer>
          <CommentTextContainer>
            {comment &&
              comments.map((comment) => (
                <CommentList key={comment.id} {...comment} />
                // <Text key={comment.id}>{comment.text}</Text>
              ))}
              {comment &&
              selfComments.map((comment) => (
                <CommentList key={comment.id} {...comment} />
              ))}
          </CommentTextContainer>
          {comment && (
            <AddCommentContainer>
              <CommentInput
                {...commentInput} onSubmitEditing={handleNewComment}
                placeholder="의견을 입력해 주세요."
              />
              <CommentButtonContainer>
                <CommentButton
                  loading={commentloading}
                  onPress={handleNewComment}
                  text="등록"
                />
              </CommentButtonContainer>
            </AddCommentContainer>
          )}
        </CommentContainer>
      </PostContainer>
    </View>
  );
};
