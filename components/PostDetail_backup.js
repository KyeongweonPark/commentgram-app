import React, { useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styles from "../styles";
import Loader from "./Loader";
import { Image, Alert, ScrollView, RefreshControl, View } from "react-native";
import PostList from "./PostList";
import useInput from "../hooks/useInput";
import PostInput from "./PostInput";
import PostButton from "./PostButton";
import moment from "moment";
import "moment/min/locales";
import { FlatList } from "react-native";

const ContainerView = styled.View`
  justify-content: flex-start;
  align-items: center;
`;

export const SEEPOSTBYNEWS = gql`
  query seePostsbyNews(
    $newsId: String!
    $offset: Int!
    $limit: Int!
    $orderBy: String!
  ) {
    seePostsbyNews(
      newsId: $newsId
      offset: $offset
      limit: $limit
      orderBy: $orderBy
    ) {
      id
      description
      CommentCount
      user {
        id
        username
      }
      UpCount
      DownCount
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

export const ADD_POST = gql`
  mutation addPost($newsId: String!, $description: String!) {
    addPost(newsId: $newsId, description: $description) {
      id
    }
  }
`;

const Touchable = styled.TouchableOpacity``;

const Bold = styled.Text`
  font-weight: 500;
`;

const Time = styled.Text`
  font-size: 12px;
  color: grey;
`;

const Text = styled.Text``;

const NewsThumbnailContainer = styled.View`
  flex: 1;
`;

const NewsContainer = styled.View`
  flex: 5;
  flex-wrap: wrap;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  display: flex;
`;

const PostStatus = styled.View`
  padding: 5px;
`;

const AddPostContainer = styled.View`
  flex-direction: row;
  align-self: flex-end;
  margin-right: 30px;
`;

const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 220px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FilterButton = styled.TouchableOpacity`
  flex: 1;
`;

const FilterText = styled.Text`
  text-align: center;
  font-size: 15px;
`;

const BoldText = styled.Text`
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  text-decoration: underline;
`;

const PostContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: center;
`;

const PostItems = styled.View``;

const BlankContainer = styled.View`
  margin-bottom: 200px;
`;

export default ({
  id,
  newsurl,
  imgurl,
  title,
  createdAt,
  PostCount,
  onRefresh,
  refreshing,
  refetch,
}) => {
  moment.locale("ko");
  const navigation = useNavigation();
  const postInput = useInput("");
  const [postloading, setPostloading] = useState(false);
  const [filter, setFilter] = useState("priority_DESC");

  const {
    data: data2,
    loading: loading2,
    refetch: refetch2,
    fetchMore,
  } = useQuery(SEEPOSTBYNEWS, {
    variables: { newsId: id, offset: 0, limit: 10, orderBy: filter },
    fetchPolicy: "network-only",
  });

  const [addPostMutation] = useMutation(ADD_POST, {
    variables: { description: postInput.value, newsId: id },
  });

  const onLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: data2.seePostsbyNews.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seePostsbyNews: [
            ...prev.seePostsbyNews,
            ...fetchMoreResult.seePostsbyNews,
          ],
        });
      },
    });
  };

  const handleNewPost = async () => {
    const { value: description } = postInput;

    if (description === "") {
      return Alert.alert("의견을 입력해 주세요.");
    }

    try {
      setPostloading(true);
      await addPostMutation();
      await refetch();
      // await refetch2();

      // await refetch2({
      //   variables: { newsId: id, offset: 0, limit: 10, orderBy: "createdAt_DESC" },
      // });
      // setFilter("createdAt_DESC");
    } catch (e) {
      Alert.alert("업로드 도중 오류가 발생했습니다.", "다시 시도하기");
    } finally {
      postInput.setValue("");
      setPostloading(false);
      Alert.alert("업로드 완료", "등록되었습니다.");
    }

    return null;
  };

  const handleRecent = () => {
    setFilter("createdAt_DESC");
  };

  const handlePast = () => {
    setFilter("createdAt_ASC");
  };

  const handleRecommend = () => {
    setFilter("priority_DESC");
  };

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        onMomentumScrollEnd={() => {
          onLoadMore();
        }}
        style={{ backgroundColor: styles.whiteColor, paddingBottom: 200 }}
      >
        <ContainerView>
          <HeaderContainer>
            <NewsThumbnailContainer>
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
            </NewsThumbnailContainer>
            <NewsContainer>
              <Touchable
                onPress={() =>
                  navigation.navigate("Webpage", { newsurl, title, imgurl })
                }
              >
                <Bold>
                  <Text>{title}</Text>
                </Bold>
                <Time>{moment(createdAt).calendar()}</Time>
              </Touchable>
            </NewsContainer>
          </HeaderContainer>
          <PostStatus>
            <Text>총 댓글수 : {PostCount}</Text>
          </PostStatus>
          <PostInput {...postInput} placeholder="의견을 입력해 주세요." />
          <AddPostContainer>
            <PostButton
              loading={postloading}
              onPress={handleNewPost}
              text="등록"
            />
          </AddPostContainer>
          <FilterContainer>
            <FilterButton onPress={handleRecommend}>
              {filter == "priority_DESC" ? (
                <BoldText>찬반순</BoldText>
              ) : (
                <FilterText>찬반순</FilterText>
              )}
            </FilterButton>
            <FilterButton onPress={handleRecent}>
              {filter == "createdAt_DESC" ? (
                <BoldText>최신순</BoldText>
              ) : (
                <FilterText>최신순</FilterText>
              )}
            </FilterButton>
            <FilterButton onPress={handlePast}>
              {filter == "createdAt_ASC" ? (
                <BoldText>과거순</BoldText>
              ) : (
                <FilterText>과거순</FilterText>
              )}
            </FilterButton>
          </FilterContainer>
          <PostContainer>
            <PostItems>
              {
                data2 &&
                data2.seePostsbyNews &&
                data2.seePostsbyNews.map((item, index) => (
                  <PostList key={index} id={item.id} refetch2={refetch2}
                  createdAt={item.createdAt}
                  description={item.description}
                  user={item.user} />
                ))
              }
            </PostItems>
          </PostContainer>

          <BlankContainer></BlankContainer>
        </ContainerView>
      </ScrollView>
    </View>
  );
};

{
  /* <PostContainer>
<PostItems>
  {loading2 ? (
    <Loader />
  ) : (
    data2 &&
    data2.seePostsbyNews && (
      <FlatList
        data={data2.seePostsbyNews}
        renderItem={({ item, index }) => (
          <PostList
            id={item.id}
            createdAt={item.createdAt}
            description={item.description}
            user={item.user}
          />
        )}
        keyExtractor={(item,index) => String(index)}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />
    )
  )}
</PostItems>
</PostContainer> */
}
