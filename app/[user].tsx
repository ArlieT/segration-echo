import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams, usePathname } from "expo-router";
const TestD = ({}) => {
  const { user } = useLocalSearchParams();
  // console.log(usePathname());
  // console.log(user);
  return (
    <View className="text-black">
      <Stack.Screen options={{ headerTitle: `${user}` }} />
      <Text style={{ color: "black" }}>{user}</Text>
      <Link href="/users" className="w-full bg-white">
        <Pressable>
          <Ionicons name="arrow-back" size={32} color="black" />
          <Text>Home</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default TestD;
