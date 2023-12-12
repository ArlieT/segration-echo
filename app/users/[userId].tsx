import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
const User = ({}) => {
  const { userId } = useLocalSearchParams();
  console.log(userId);
  return (
    <View>
      <Text style={{ color: "black" }}>{userId}</Text>
    </View>
  );
};

export default User;
