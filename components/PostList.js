import React, { useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import constants from "../constants";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import useInput from "../hooks/useInput";
import CommentInput from "./CommentInput";
import CommentButton from "./CommentButton";

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

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  width: 95%;
`;

const Text = styled.Text``;

const Touchable = styled.TouchableOpacity``;

const PostContainer = styled.View`
  margin-top: 20px;
  margin-left: 10px;
  width: ${constants.width / 1.1}px;
`;

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
  flex: 4;
`;
const PostStatusCommentTouchable = styled.TouchableOpacity``;

const PostStatusUp = styled.View`
  flex: 1;
`;

const PostStatusDown = styled.View`
  flex: 1;
`;

const PostStatusText = styled.Text`
  font-size: 12px;
`;

const CommentContainer = styled.View`
margin-top:10px;
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


export default ({ id, createdAt, description, user }) => {
  const [comment, setComment] = useState(false);
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(SEEPOST, {
    // skip: comment === false,
    variables: { postId: id },
  });
  const toggleComment = () => {
    setComment((Flag) => !Flag);
  };

  const commentInput = useInput("");
  const [commentloading, setCommentloading] = useState(false);
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
      await addCommentMutation();
      await refetch({ variables: { postId: id } });
      commentInput.setValue("");
    } catch (e) {
      Alert.alert("업로드 도중 오류가 발생했습니다.", "다시 시도하기");
    } finally {
      setCommentloading(false);
    }

    return null;

  };


  return (
    <View>
      <PostContainer>
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
                대댓글: {data && data.seePost && data.seePost.CommentCount}
              </PostStatusText>
            </PostStatusCommentTouchable>
          </PostStatusComment>

          <PostStatusUp>
            <PostStatusText>
              Up: {data && data.seePost && data.seePost.UpCount}
            </PostStatusText>
          </PostStatusUp>
          <PostStatusDown>
            <PostStatusText>
              Down: {data && data.seePost && data.seePost.DownCount}
            </PostStatusText>
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
          </CommentTextContainer>
          {comment &&
            data && (
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
      </PostContainer>
    </View>
  );
};
