import React, { useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import constants from "../constants";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import useInput from "../hooks/useInput";
import CommentInput from "./CommentInput";
import CommentButton from "./CommentButton";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles";
import { Alert } from "react-native";

export const SEEPOST = gql`
  query seePost($postId: String!) {
    seePost(id: $postId) {
      comments {
        id
        text
        user {
          username
        }
        createdAt
      }
      isUp
      isDown
      UpCount
      DownCount
      CommentCount
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
    }
  }
`;

export const TOGGLE_UP = gql`
  mutation toggleUp($postId: String!) {
    toggleUp(postId: $postId)
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  width: 95%;
`;

const Text = styled.Text``;

const Touchable = styled.TouchableOpacity``;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PostUserName = styled.Text`
  flex: 1;
  color: ${(props) => props.theme.blueColor};
`;

const PostTimeStamp = styled.Text`
  color: gray;
  flex: 4;
  margin-left: 10px;
`;

const PostReport = styled.Text`
  flex: 0.5;
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
  flex: 1;
  flex-direction: row;
`;

const UpIconContainer = styled.TouchableOpacity``;

const DownIconContainer = styled.TouchableOpacity``;

const PostStatusDown = styled.View`
  flex: 1;
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
  flex-direction: column;
  align-self: center;
`;

const CommentButtonContainer = styled.View`
  align-self: flex-end;
`;

export default ({
  id,
  createdAt,
  description,
  user,
  isUp: isUpProp,
  isDown: isDownProp,
  UpCount: UpCountProp,
  DownCount: DownCountProp,
  CommentCount: CommentCountProp,
  comments,
}) => {
  const [comment, setComment] = useState(false);
  const [isUp, setIsUp] = useState(isUpProp);
  const [isDown, setIsDown] = useState(isDownProp);
  const [upCount, setUpCount] = useState(UpCountProp);
  const [downCount, setDownCount] = useState(DownCountProp);
  const navigation = useNavigation();
  const [toggleUpMutation] = useMutation(TOGGLE_UP, {
    variables: {
      postId: id,
    },
  });

  const { data, loading, refetch } = useQuery(SEEPOST, {
    variables: { postId: id },
  });

  const toggleComment = () => {
    setComment((Flag) => !Flag);
  };
  const handleUp = async () => {
    try {
      await toggleUpMutation();
      if (isUp === true) {
        setUpCount((l) => l - 1);
      } else {
        setUpCount((l) => l + 1);
      }
      setIsUp((p) => !p);
    } catch (e) {}
  };

  const commentInput = useInput("");
  const [commentloading, setCommentloading] = useState(false);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    skip: commentloading,
    variables: { text: commentInput.value, postId: id },
  });

  if (data && data.seePost && data.seePost) {
    console.log(comments);
  }
  const handleNewComment = async () => {
    const { value: text } = commentInput;

    if (text === "") {
      return Alert.alert("의견을 입력해 주세요.");
    }

    try {
      setCommentloading(true);
      await addCommentMutation();
      await refetch({ variables: { postId: id } });
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
    <>
      <PostHeader>
        <Touchable onPress={() => navigation.navigate("Userpage", { id })}>
          <PostUserName>{user.username}</PostUserName>
        </Touchable>
        <PostTimeStamp>{createdAt}</PostTimeStamp>
        <PostReport>신고</PostReport>
      </PostHeader>
      <PostContentContainer>
        <PostContent>{description}</PostContent>
      </PostContentContainer>
      <PostStatusContainer>
        <PostStatusComment>
          <PostStatusCommentTouchable onPress={toggleComment}>
            <PostStatusText>
              {data &&
                data.seePost &&
                data.seePost.CommentCount &&
                (data.seePost.CommentCount > 0 ? (
                  <Text>답글: {data.seePost.CommentCount}</Text>
                ) : (
                  <Text>답글작성</Text>
                ))}
            </PostStatusText>
          </PostStatusCommentTouchable>
        </PostStatusComment>
        <PostStatusBlank></PostStatusBlank>
        <PostStatusUp>
          <UpIconContainer onPress={handleUp}>
            {isUp ? (
              <FontAwesome5 name="thumbs-up" size={15} color={styles.upColor} />
            ) : (
              <FontAwesome5
                name="thumbs-up"
                size={14}
                color={styles.blackColor}
              />
            )}
          </UpIconContainer>
          <PostStatusUpText>{upCount}</PostStatusUpText>
        </PostStatusUp>
        <PostStatusDown>
          <DownIconContainer>
            {data && data.seePost && data.seePost.isDown ? (
              <FontAwesome5
                name="thumbs-down"
                size={15}
                color={styles.downColor}
              />
            ) : (
              <FontAwesome5
                name="thumbs-down"
                size={14}
                color={styles.blackColor}
              />
            )}
          </DownIconContainer>
          <PostStatusDownText>
            {data && data.seePost && data.seePost.DownCount}
          </PostStatusDownText>
        </PostStatusDown>
      </PostStatusContainer>
      <CommentContainer>
        <CommentTextContainer>
          {comment &&
            data &&
            data.seePost &&
            data.seePost.comments.map((comment) => (
              // <CommentList key={post.id} {...post} />
              <Text key={comment.id}>{comment.text}</Text>
            ))}

          {/* data.seePost.comments.map((comment) => (<CommentList key={post.id} {...post} /><Text key={comment.id}>{comment.text}</Text>)) */}
        </CommentTextContainer>
        {comment && data && (
          <AddCommentContainer>
            <CommentInput
              {...commentInput}
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
    </>
  );
};
