import React, { useState } from "react";
import styled from "styled-components";
import UserPost from "./UserPost";
import styles from "../styles";
import constants from "../constants";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { useIsLoggedIn, useLogOut, useLogIn } from "../AuthContext";

export const SEEPOSTBYUSER = gql`
  query seePostsbyUser($userId: String!, $offset: Int!, $limit: Int!) {
    seePostsbyUser(userId: $userId, offset: $offset, limit: $limit) {
      id
      description
      newsurl {
        id
        title
        newsurl
        imgurl
        createdAt
        postcount
      }
      comments {
        id
        text
        user {
          id
          username
        }
        createdAt
      }
      isUp
      isDown
      isPostReport
      UpCount
      DownCount
      CommentCount
      PostReportCount
      createdAt
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

export const TOGGLE_USERREPORT = gql`
  mutation toggleUserreport($userId: String!) {
    toggleUserreport(userId: $userId)
  }
`;

const View = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${constants.width}px;
`;

const UserPostView = styled.View`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;
const HeaderContainer = styled.View`
  display: flex;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const HeaderDetail = styled.View`
  flex: 3;
`;
const ButtonContainer = styled.TouchableOpacity`
  flex: 2;
`;

const ReportButtonContainer = styled.View`
  flex: 2;
`;

const LogoutButton = styled.View`
  width: 100px;
  border: 0;
  border-radius: 7px;
  background-color: ${(props) => props.theme.blueColor};
  display: flex;
  align-items: center;
  padding: 7px 0px;
  font-size: 14px;
`;

const ReportButton = styled.View`
  width: 100px;
  border: 0;
  border-radius: 7px;
  background-color: ${(props) => props.theme.redColor};
  display: flex;
  align-items: center;
  padding: 7px 0px;
  font-size: 14px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

const ProfileStats = styled.View`
  align-self: center;
  flex-direction: row;
  margin-top: 30px;
  width: ${constants.width/1.2}px;
  display: flex;
  justify-content: space-between;
  
  text-align: center;
`;

const Stat = styled.View`
  align-items: center;
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-top: 5px;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

export default ({
  id,
  username,
  email,
  bio,
  postsCount,
  commentsCount,
  reportersCount,
  reportingCount,
  fullName,
  isSelf = false,
  isReporting = false,
  refetchme = null,
}) => {
  const { data, loading, refetch, fetchMore } = useQuery(SEEPOSTBYUSER, {
    variables: {
      userId: id,
      offset: 0,
      limit: 20,
    },
    fetchPolicy: "network-only",
  });

  const logOut = useLogOut();
  const [refreshing, setRefreshing] = useState(false);
  const [isReportingS, setIsReportingS] = useState(isReporting);
  const [reportersCountS, setReportersCountS] = useState(reportersCount);
  const [toggleUserreportMutation] = useMutation(TOGGLE_USERREPORT, {
    variables: {
      userId: id,
    },
  });

  const onLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: data.seePostsbyUser.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seePostsbyUser: [
            ...prev.seePostsbyUser,
            ...fetchMoreResult.seePostsbyUser,
          ],
        });
      },
    });
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetchme();
      await refetch();

    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleReport = async () => {
    try {
      if (isReportingS === true) {
        throw "이미 신고하셨습니다.";
      }
      await toggleUserreportMutation();
      if (isReportingS === false) {
        setReportersCountS((l) => l + 1);
      }
      setIsReportingS(true);
    } catch (e) {
      Alert.alert("신고 에러", e);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "로그인 화면으로 돌아갑니다.\n계속 하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel",
        },
        { text: "확인", onPress: () => logOut() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <ScrollView
        style={{ backgroundColor: styles.whiteColor }}
        contentContainerStyle={{ alignSelf: "flex-start" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        onMomentumScrollEnd={() => {
          onLoadMore();
        }}
      >
        {data && data.seePostsbyUser && (
          <ProfileHeader>
            <HeaderColumn>
              <HeaderContainer>
                {isSelf ? (
                  <HeaderDetail>
                    <Bold>계정: {email}</Bold>
                    <Bold>사용자명: {fullName}</Bold>
                    <Bold>닉네임: {username}</Bold>
                  </HeaderDetail>
                ) : (
                  <HeaderDetail>
                    <Bold>닉네임: {username}</Bold>
                  </HeaderDetail>
                )}

                {isSelf ? (
                  <ButtonContainer onPress={handleLogout}>
                    <LogoutButton>
                      <Text>로그아웃</Text>
                    </LogoutButton>
                  </ButtonContainer>
                ) : isReportingS ? (
                  <ReportButtonContainer>
                    <ReportButton>
                      <Text>신고 중</Text>
                    </ReportButton>
                  </ReportButtonContainer>
                ) : (
                  <ButtonContainer onPress={handleReport}>
                    <ReportButton>
                      <Text>신고하기</Text>
                    </ReportButton>
                  </ButtonContainer>
                )}
              </HeaderContainer>

              <ProfileStats>
                <Stat>
                  <Bold>{postsCount}</Bold>
                  <StatName>댓글</StatName>
                </Stat>
                <Stat>
                  <Bold>{commentsCount}</Bold>
                  <StatName>대댓글</StatName>
                </Stat>
                <Stat>
                  <Bold>{reportersCountS}</Bold>
                  <StatName>신고 당함</StatName>
                </Stat>
                <Stat>
                  <Bold>{reportingCount}</Bold>
                  <StatName>신고 중</StatName>
                </Stat>
              </ProfileStats>
            </HeaderColumn>
          </ProfileHeader>
        )}

        <UserPostView>
          {data &&
            data.seePostsbyUser &&
            data.seePostsbyUser.map((p, index) => (
              <UserPost key={index} {...p} refetch={refetch} />
            ))}
        </UserPostView>
      </ScrollView>
    </View>
  );
};
