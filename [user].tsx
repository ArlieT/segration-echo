import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
const User = ({}) => {
  const { user } = useLocalSearchParams();
  console.log(user);
  return (
    <View>
      <Text style={{ color: "black" }}>{user}</Text>
    </View>
  );
};

export default User;
