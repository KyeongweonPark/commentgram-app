import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import NewsList from "../../components/NewsList";
// import Post from "../../components/Post";

export const NEWSES_QUERY = gql`
  query seeNewsesRank($term: String) {
    seeNewsesRank(term: $term) {
      id
      newsurl
      imgurl
      title
      PostCount
      createdAt
    }
  }
`;

const Text = styled.Text`
  text-align: center;
  font-size: 17px;
`;

const BoldText = styled.Text`
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  text-decoration: underline;
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  flex: 1;
  background-color: ${(props) => props.theme.whiteColor};
`;

const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 220px;
  margin-bottom: 10px;
`;

const FilterButton = styled.TouchableOpacity`
  flex: 1;
`;
const FilterButtonWeek = styled.TouchableOpacity`
  flex: 1;
`;
const FilterButtonMonth = styled.TouchableOpacity`
  flex: 1;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("오늘");
  const [term, setTerm] = useState("day");

  const { loading, data, refetch } = useQuery(NEWSES_QUERY, {
    variables: {term:term},
    fetchPolicy: "network-only",
  });

  navigation.setOptions({
    title: "댓글 순 (" + filter + ")",
  });

  const handleFilterDay = async () => {
    setFilter("오늘");
    setTerm("day");
    
    navigation.setOptions({
      title: "댓글 순 (" + filter + ")",
    });
  };

  const handleFilterWeek = async () => {
    setFilter("한주");
    setTerm("week");
    navigation.setOptions({
      title: "댓글 순 (" + filter + ")",
    });
  };

  const handleFilterMonth = async () => {
    setFilter("한달");
    setTerm("month");
    navigation.setOptions({
      title: "댓글 순 (" + filter + ")",
    });
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View>
      <FilterContainer>
        <FilterButton onPress={handleFilterDay}>
          {filter == "오늘" ? <BoldText>오늘</BoldText> : <Text>오늘</Text>}
        </FilterButton>
        <FilterButton onPress={handleFilterWeek}>
          {filter == "한주" ? <BoldText>한주</BoldText> : <Text>한주</Text>}
        </FilterButton>
        <FilterButton onPress={handleFilterMonth}>
          {filter == "한달" ? <BoldText>한달</BoldText> : <Text>한달</Text>}
        </FilterButton>
      </FilterContainer>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.seeNewsesRank &&
          data.seeNewsesRank.map((news) => <NewsList key={news.id} {...news} />)
        )}
      </ScrollView>
    </View>
  );
};
