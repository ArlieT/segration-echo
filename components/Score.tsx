import { View, Text } from "react-native";
import React from "react";

const Score = ({ score, label }: { label: string; score: string | number }) => {
  console.log({ score });

  return (
    <View className="min-w-[70px] min-h-[70px] rounded-lg bg-slate-300/20 p-2 px-4 justify-center items-center">
      <Text className="font-bold text-[#051C2E]">{label}</Text>
      <View className="whitespace-nowrap w-[30px] h-[30px] mt-1">
        <Text className="justify-center items-center text-center text-xs  whitespace-nowrap truncate">
          {score?.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default Score;
