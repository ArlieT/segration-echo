import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
const TestD = ({}) => {
  const { user } = useLocalSearchParams();
  console.log(user);
  return (
    <View>
      <Text style={{ color: "black" }}>{user}</Text>
      <Text style={{ color: "black" }}>{user}</Text>
    </View>
  );
};

export default TestD;
