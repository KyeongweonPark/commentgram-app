import React, { useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styles from "../styles";
import Loader from "./Loader";
import { Image, Alert } from "react-native";
import PostList from "./PostList";
import useInput from "../hooks/useInput";
import PostInput from "./PostInput";
import PostButton from "./PostButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const SEENEWS = gql`
  query seeNews($newsId: String!) {
    seeNews(id: $newsId) {
      id
      imgurl
      newsurl
      title
      PostCount
      posts {
        id
        description
        user {
          id
          username
        }
        createdAt
        isUp
        isDown
        UpCount
        DownCount
        CommentCount
      }
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

const Location = styled.Text`
  font-size: 12px;
  color: grey;
`;

const Text = styled.Text``;

const NewsThumbnailContainer = styled.View`
  padding-left: 20px;
`;

const NewsContainer = styled.View`
  width: 95%;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  padding: 20px;
`;

const PostStatus = styled.View`
  padding: 20px;
`;

const AddPostContainer = styled.View`
  flex-direction: row;
  align-self: flex-end;
  margin-right: 30px;
`;

const PostContainer = styled.View`
  flex-direction: row;
`;

const PostItems = styled.View``;

const BlankContainer = styled.View`
  margin-bottom: 200px;
`;

export default ({ id, newsurl, imgurl, title }) => {
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(SEENEWS, {
    variables: { newsId: id },
    fetchPolicy: "network-only",
  });
  const postInput = useInput("");
  const [postloading, setPostloading] = useState(false);
  const [addPostMutation] = useMutation(ADD_POST, {
    variables: { description: postInput.value, newsId: id },
  });
  const handleNewPost = async () => {
    const { value: description } = postInput;

    if (description === "") {
      return Alert.alert("의견을 입력해 주세요.");
    }

    try {
      setPostloading(true);
      await addPostMutation();
      await refetch({ variables: { newsId: id } });
      postInput.setValue("");
    } catch (e) {
      Alert.alert("업로드 도중 오류가 발생했습니다.", "다시 시도하기");
    } finally {
      setPostloading(false);
    }

    return null;
  };

  return (
    <View>
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
            <Location>{newsurl}</Location>
          </Touchable>
        </NewsContainer>
      </HeaderContainer>
      <PostStatus>
        {data && data.seeNews && (
          <Text>총 댓글수 : {data.seeNews.PostCount}</Text>
        )}
      </PostStatus>
      <PostInput {...postInput} placeholder="의견을 입력해 주세요." />
      <AddPostContainer>
        <PostButton loading={postloading} onPress={handleNewPost} text="등록" />
      </AddPostContainer>
      <PostContainer>
        <PostItems>
          {data &&
            data.seeNews &&
            data.seeNews.posts.map((post) => (
              <PostList key={post.id} {...post} />
            ))}
        </PostItems>
      </PostContainer>

      <BlankContainer></BlankContainer>
    </View>
  );
};
