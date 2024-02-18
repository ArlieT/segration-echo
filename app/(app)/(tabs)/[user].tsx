import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";
import {
  Link,
  Stack,
  router,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const TestD = ({}) => {
  const { user } = useLocalSearchParams();
  console.log(user);
  // console.log(user);
  return (
    <SafeAreaView className="text-black bg-[#f1efee]">
      {/* <View className="flex-row flex items-center px-2 py-3 bg-white gap-x-2 w-full ">
        <Pressable onPress={() => router.replace("/users")}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
        <Text style={{ color: "black", fontWeight: "bold" }}>{user}</Text>
      </View> */}
      <View className="h-full justify-center items-center">
        <Text>Fetch data {user}</Text>
      </View>
    </SafeAreaView>
  );
};

export default TestD;
