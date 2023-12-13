import React from "react";
import { Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
const TestD = ({}) => {
  const { user } = useLocalSearchParams();
  console.log(user);
  return (
    <View>
      <Stack.Screen options={{ headerTitle: `${user}` }} />
      <Text style={{ color: "black" }}>{user}</Text>
    </View>
  );
};

export default TestD;
