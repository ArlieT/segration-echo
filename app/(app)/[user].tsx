import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useObject } from "react-firebase-hooks/database";
import firebaseRef from "../../firebase/ref";
import { useAuth } from "../../_store/authStore";
import { FontAwesome } from "@expo/vector-icons";
import { TBinScore } from "./(student)";
const Student = ({ route }: { route: { params: { username: string } } }) => {
  const { token } = useAuth();

  const { username } = route.params;
  const [student, loading, error] = useObject(
    firebaseRef(`users/STUDENT/${username}`)
  );

  useEffect(() => {
    console.log({ student });
    console.log("test scores ", student?.val().bin_score);
  }, [student, student?.val()]);

  return (
    <SafeAreaView className="border flex-1 justify-center items-center p-4">
      <MyProfile username={username} percentage={student?.val()?.bin_score} />
    </SafeAreaView>
  );
};

export default Student;

type Props = {
  username?: string;
  percentage?: TBinScore;
  count?: TBinScore;
};

const MyProfile = ({ username, percentage, count }: Props) => {
  return (
    <View className="rounded-xl p-4 w-full justify-center items-center gap-y-4 bg-white">
      <View className="h-[64px]">
        <FontAwesome name="user-circle" size={64} />
      </View>
      <View className="gap-y-6 p-6 w-full">
        <View className="flex-row">
          <Text>Name: </Text>
          <Text className="font-bold">{username}</Text>
        </View>
        <View className="flex-row">
          <Text>Role: </Text>
          <Text className="font-bold">{"Student"}</Text>
        </View>
      </View>
      <View className="w-full border-t border-black/70" />
      <View className="gap-y-6 p-6 w-full">
        <Text className="text-xl font-bold">Score</Text>
        <View className="flex-row">
          <Text>Can: </Text>
          <Text className="font-bold">{count?.can}</Text>
        </View>
        <View className="flex-row">
          <Text>Paper: </Text>
          <Text className="font-bold">{count?.paper}</Text>
        </View>
        <View className="flex-row">
          <Text>Plastic: </Text>
          <Text className="font-bold">{count?.plastic}</Text>
        </View>
      </View>
      <Pressable className="w-full bg-[#051c2e] rounded-xl p-4">
        <Text className="text-white font-bold text-lg text-center">Print</Text>
      </Pressable>
    </View>
  );
};
export { MyProfile };
