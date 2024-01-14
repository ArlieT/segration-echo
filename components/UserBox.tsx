import { View, Text, Pressable } from "react-native";
import React from "react";
import { TUsers } from "../constants/fakeusers";
import { Link, router } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Score from "./Score";

const UserBox = ({
  className,
  scores,
  username,
}: TUsers & { className?: string }) => {
  return (
    <View
      style={{ elevation: 20 }}
      className={`${className} shadow-md bg relative gray-300/50 max-h-[400px] mb-2 py-6 pt-12 bg-white w-full text-white justify-around items-center flex-row rounded-md`}
    >
      <View className="">
        <Text className="font-bold text">{username}</Text>
        <AnimatedLottieView
          autoPlay
          style={{ width: 30, height: 30 }}
          source={require("../assets/animated/user.json")}
        />
      </View>
      <Score label="Can" score={scores.can} />
      <Score label="Plastic" score={scores.plastic} />
      <Score label="Paper" score={scores.paper} />

      <View className="h-4 absolute top-4 right-4 flex justify-center items-center px-2 ">
        <TouchableOpacity
          onPress={() => router.replace(`/users/${username}`)}
          className="  hover:bg-red-500  group-isolate gap-x-1 flex-row"
        >
          <View className="group-isolate-hover:bg-red-500 w-1.5 h-1.5 rounded-full bg-gray-800"></View>
          <View className="w-1.5 h-1.5 rounded-full bg-gray-800"></View>
          <View className="w-1.5 h-1.5 rounded-full bg-gray-800"></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserBox;
