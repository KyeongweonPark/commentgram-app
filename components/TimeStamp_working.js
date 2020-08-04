import React from "react";
import { Text } from "react-native";

export default (time) => {

    return <Text>{time.slice(0, 10)}</Text>
}