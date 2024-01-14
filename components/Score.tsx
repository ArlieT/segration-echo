import { View, Text } from "react-native";
import React from "react";

const Score = ({ score, label }: { label: string; score: string | number }) => {
  return (
    <View className="min-w-[70px] min-h-[70px] rounded-lg bg-slate-300/20 p-2 px-4 justify-center items-center">
      <Text className="font-bold text-[#051C2E]">{label}</Text>
      <Text className="w-[30px] h-[30px] justify-center items-center text-center  align-middle leading-8 text-lg">
        {score}
      </Text>
    </View>
  );
};

export default Score;
