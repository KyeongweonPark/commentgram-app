import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import constants from "../constants";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import useInput from "../hooks/useInput";
import CommentInput from "./CommentInput";
import CommentButton from "./CommentButton";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import styles from "../styles";
import { Alert, FlatList } from "react-native";
import CommentList from "./CommentList";
import moment from "moment";
import "moment/min/locales";
import { useLazyQuery } from "@apollo/react-hooks";

export const SEEPOST = gql`
  query seePost($postId: String!) {
    seePost(id: $postId) {
      isUp
      isDown
      isPostReport
      UpCount
      DownCount
      CommentCount
      PostReportCount
    }
  }
`;

export const SEEPOSTCOMMENTS = gql`
  query seePost($postId: String!) {
    seePost(id: $postId) {
      comments {
        id
        text
        user {
          id
          username
        }
        createdAt
      }
    }
  }
`;

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

export const TOGGLE_UP = gql`
  mutation toggleUp($postId: String!) {
    toggleUp(postId: $postId)
  }
`;

export const TOGGLE_DOWN = gql`
  mutation toggleDown($postId: String!) {
    toggleDown(postId: $postId)
  }
`;

export const TOGGLE_REPORT = gql`
  mutation togglePostreport($postId: String!) {
    togglePostreport(postId: $postId)
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

const PostContainer = styled.View`
  margin-top: 10px;
  padding-top: 10px;
  margin-left: 10px;
  width: ${constants.width / 1.1}px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-top-width: 1px;
`;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Touchable = styled.TouchableOpacity`
  flex: 1;
`;

const PostUserName = styled.Text`
  flex: 1;
  color: ${(props) => props.theme.blueColor};
  font-weight: 700;
`;

const PostTimeStamp = styled.Text`
  color: gray;
  flex: 4;
  margin-left: 10px;
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

const PostContentBlind = styled.Text`
  text-align: left;
  color: gray;
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

const UpIconContainer = styled.TouchableOpacity``;

const DownIconContainer = styled.TouchableOpacity``;

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
  flex-direction: column;
  align-self: center;
`;

const CommentButtonContainer = styled.View`
  align-self: flex-end;
`;

export default ({
  id,
  description,
  user,
  comments,
  isUp,
  isDown,
  isPostReport,
  UpCount,
  DownCount,
  CommentCount,
  PostReportCount,
  createdAt,
  refetch2,
}) => {
  const userid = user.id;
  const [comment, setComment] = useState(false);
  const [isUpS, setIsUp] = useState(isUp);
  const [isDownS, setIsDown] = useState(isDown);
  const [isPostReportS, setIsPostReport] = useState(isPostReport);
  const [upCountS, setUpCount] = useState(UpCount);
  const [downCountS, setDownCount] = useState(DownCount);
  const [postReportCountS, setPostReportCount] = useState(PostReportCount);
  const [selfComments, setSelfComments] = useState([]);
  const [commentCountS, setCommentCount] = useState(CommentCount);

  moment.locale("ko");

  const navigation = useNavigation();
  const [toggleUpMutation] = useMutation(TOGGLE_UP, {
    variables: {
      postId: id,
    },
  });

  const [toggleDownMutation] = useMutation(TOGGLE_DOWN, {
    variables: {
      postId: id,
    },
  });

  const [toggleReportMutation] = useMutation(TOGGLE_REPORT, {
    variables: {
      postId: id,
    },
  });

  // const { data, loading, refetch } = useQuery(SEEPOST, {
  //   variables: { postId: id },
  //   fetchPolicy: "network-only",
  // });

  // const [getComments, { loading: loading2, data: data2 }] = useLazyQuery(
  //   SEEPOSTCOMMENTS,
  //   {
  //     variables: { postId: id },
  //     fetchPolicy: "network-only",
  //   }
  // );

  // const initialize = async () => {
  //   const {
  //     data: { seePost },
  //   } = await refetch();
  //   setUpCount(seePost.UpCount);
  //   setDownCount(seePost.DownCount);
  //   setPostReportCount(seePost.PostReportCount);
  //   setIsUp(seePost.isUp);
  //   setIsDown(seePost.isDown);
  //   setIsPostReport(seePost.isPostReport);
  // };

  // useEffect(() => {
  //   initialize();
  // }, []);

  const toggleComment = async () => {
    if (comment == false) {
      // await getComments();
    }
    setComment((Flag) => !Flag);
  };
  const handleUp = async () => {
    try {
      if (isDownS === true) {
        throw "이미 반대하셨습니다.";
      }
      if (isUpS === true) {
        setUpCount((l) => l - 1);
      } else {
        setUpCount((l) => l + 1);
      }
      setIsUp((p) => !p);
      await toggleUpMutation();
    } catch (e) {
      Alert.alert("등록 에러", e);
    }
  };

  const handleDown = async () => {
    try {
      if (isUpS === true) {
        throw "이미 찬성하셨습니다.";
      }
      if (isDownS === true) {
        setDownCount((l) => l - 1);
      } else {
        setDownCount((l) => l + 1);
      }
      setIsDown((p) => !p);
      await toggleDownMutation();
    } catch (e) {
      Alert.alert("등록 오류", e);
    }
  };

  const handleReport = async () => {
    try {
      if (isPostReportS === true) {
        throw "이미 신고하셨습니다.";
      }
      await toggleReportMutation();
      if (isPostReportS === false) {
        setPostReportCount((l) => l + 1);
        
        Alert.alert("신고 완료", "신고 처리가 완료되었습니다.");
      }
      setIsPostReport((p) => !p);
    } catch (e) {
      Alert.alert("기존 신고 완료", e);
    }
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
      const {
        data: { addComment },
      } = await addCommentMutation();
      setSelfComments([...selfComments, addComment]);
      setCommentCount((l) => l + 1);
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
      <PostContainer>
        <PostHeader>
          <Touchable
            onPress={() => navigation.navigate("Userpage", { id: userid })}
          >
            <PostUserName>{user.username}</PostUserName>
          </Touchable>
          <PostTimeStamp>{moment(createdAt).fromNow()}</PostTimeStamp>
          <ReportIconContainer onPress={handleReport}>
            {isPostReportS ? (
              <MaterialIcons
                name="report"
                size={23}
                color={styles.reportColor}
              />
            ) : (
              <MaterialIcons
                name="report"
                size={22}
                color={styles.darkGreyColor}
              />
            )}
          </ReportIconContainer>
          <PostReport>{postReportCountS}</PostReport>
        </PostHeader>
        {postReportCountS < 100 ? (
          <PostContentContainer>
            <PostContent>{description}</PostContent>
          </PostContentContainer>
        ) : (
          <PostContentContainer>
            <PostContent>네티즌의 신고로 블라인드 처리되었습니다.</PostContent>
          </PostContentContainer>
        )}
        <PostStatusContainer>
          <PostStatusComment>
            <PostStatusCommentTouchable onPress={toggleComment}>
              {commentCountS == 0 ? (
                <PostStatusText>답글작성</PostStatusText>
              ) : (
                <PostStatusText>
                  답글: {commentCountS}
                </PostStatusText>
              )}
            </PostStatusCommentTouchable>
          </PostStatusComment>
          <PostStatusBlank></PostStatusBlank>
          <PostStatusUp>
            <UpIconContainer onPress={handleUp}>
              {isUpS ? (
                <FontAwesome5
                  name="thumbs-up"
                  size={15}
                  color={styles.upColor}
                />
              ) : (
                <FontAwesome5
                  name="thumbs-up"
                  size={14}
                  color={styles.blackColor}
                />
              )}
            </UpIconContainer>
            <PostStatusUpText>{upCountS}</PostStatusUpText>
          </PostStatusUp>
          <PostStatusDown>
            <DownIconContainer onPress={handleDown}>
              {isDownS ? (
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
            <PostStatusDownText>{downCountS}</PostStatusDownText>
          </PostStatusDown>
        </PostStatusContainer>
        <CommentContainer>
          <CommentTextContainer>
            {comment &&
              comments.map((comment) => (
                // <FlatList
                //   data={data2.seePost.comments}
                //   renderItem={({ item, index }) => (
                //     <CommentList
                //       id={item.id}
                //       createdAt={item.createdAt}
                //       text={item.text}
                //       user={item.user}
                //     />
                //   )}
                //   keyExtractor={(item, index) => String(index)}
                // />
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
