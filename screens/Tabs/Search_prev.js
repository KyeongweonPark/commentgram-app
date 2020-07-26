import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {

  const usesearchInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (text) => {
      setValue(text);
      setReload(false);
    };
    return { value, onChange, setValue };
  };
  const searchInput = usesearchInput("");
  const [reload, setReload] = useState(false);
  navigation.setOptions({
    headerTitle: () => <SearchBar {...searchInput} onSubmit={SubmitTerm} />,
  });
  const SubmitTerm = () => {
    setReload(true);
  };

  return reload ? (
    <SearchPresenter term={searchInput.value} />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text>Search</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
