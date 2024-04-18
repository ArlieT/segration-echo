import { View, Text } from "react-native";
import React from "react";
import { TUsers } from "../constants/fakeusers";
import AnimatedLottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Score from "./Score";
import { useNavigation } from "expo-router/src/useNavigation";

const UserBox = ({
  className,
  bin_score,
  username,
  ...props
}: TUsers & { className?: string }) => {
  const { navigate } = useNavigation();
  return (
    <View
      style={{ elevation: 20 }}
      className={`${className} w-full border-gray-300/50 shadow-md bg relative gray-300/50 max-h-[400px] mb-2 py-6 pt-12 bg-white C/w-full text-white justify-around items-center flex-row rounded-md`}
    >
      <View className="justify-center flex-[0.3] items-center">
        <Text className="font-bold text">{username || "anonymous"}</Text>
        <AnimatedLottieView
          autoPlay
          style={{ width: 30, height: 30 }}
          source={require("../assets/animated/user.json")}
        />
      </View>
      <View className="flex flex-row flex-1">
        <Score label="Can" score={bin_score?.can || 0} />
        <Score label="Plastic" score={bin_score?.plastic || 0} />
        <Score label="Paper" score={bin_score?.paper || 0} />
      </View>
      <View className="h-4 absolute top-4 right-2 flex justify-center items-center px-2 ">
        <TouchableOpacity
          onPress={() => navigate("User", { username })}
          className="p-3 hover:bg-red-500  group-isolate gap-x-1 flex-row"
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
