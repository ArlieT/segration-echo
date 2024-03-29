import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useObject } from "react-firebase-hooks/database";
import firebaseRef from "../../firebase/ref";
import { useAuth } from "../../_store/useAuthStore";
import { FontAwesome } from "@expo/vector-icons";
import { TBinScore } from "./(student)";
import { set } from "firebase/database";
import useBottomSheetGlobal from "../../_store/useBottomSheetGloba";

const Student = ({ route }: { route: { params: { username: string } } }) => {
  const { token } = useAuth();

  const { username } = route.params;
  const [student, loading, error] = useObject(
    firebaseRef(`users/STUDENT/${username}`)
  );

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4">
      <MyProfile
        username={username}
        count={student?.val()?.bin_score}
        percentage={student?.val()?.bin_score}
      />
    </SafeAreaView>
  );
};

export default Student;

type Props = {
  username?: string;
  percentage?: TBinScore;
  count: TBinScore;
};

const MyProfile = ({ username, count }: Props) => {
  const { token } = useAuth();

  return (
    <View className="rounded-xl p-4 h-full w-full justify-center items-center gap-y-4 bg-white">
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
      <View className="w-full border-t border-black/40" />
      {token?.role === "ADMIN" ? (
        <EditableScore count={count} username={username} />
      ) : (
        <DefaultScore count={count} username={username} />
      )}
    </View>
  );
};
export { MyProfile };

type EditableProps = {
  count?: TBinScore;
  username?: string;
};

const EditableScore = ({ count, username }: EditableProps) => {
  const [score, setScore] = useState<TBinScore | undefined>(count);
  const { bottomSheetRef, setSnapeIndex, snapeIndex } = useBottomSheetGlobal();

  useEffect(() => {
    if (count) setScore(count);
  }, [count]);

  const handleSaveScore = () => {
    if (snapeIndex === 0) {
      setSnapeIndex(-1);
    }
    setSnapeIndex(0);

    bottomSheetRef?.current?.snapToIndex(0);
    set(firebaseRef(`users/STUDENT/${username}/bin_score`), {
      ...score,
    });
  };

  const handleOnchange = (e: string, type: keyof TBinScore) => {
    const parsedValue = parseInt(e);
    const isValidInput = !isNaN(parsedValue);
    const sanitizedValue = isValidInput ? parsedValue : 0;

    setScore((prev) => ({
      ...prev!,
      [type]: String(sanitizedValue),
    }));
  };

  return (
    <View className="gap-y-6 p-6 w-full">
      <View className="flex gap-y-2">
        <Text className="text-lg text-left font-bold w-full">
          Student Score
        </Text>
        <View className="flex justify-around items-center gap-y-2">
          <Text className="text-left font-semibold w-full">Can:</Text>
          <TextInput
            value={String(score?.can || 0)}
            keyboardType="numeric"
            onChangeText={(e) => handleOnchange(e, "can")}
            className="w-full rounded-[10px] px-[12px] border py-2"
          />
        </View>
        <View className="flex justify-around items-center gap-y-2">
          <Text className="text-left font-semibold w-full">Paper</Text>
          <TextInput
            value={String(score?.paper || 0)}
            keyboardType="numeric"
            onChangeText={(e) => handleOnchange(e, "paper")}
            className="w-full rounded-[10px] px-[12px] border py-2"
          />
        </View>
        <View className="flex justify-around items-center gap-y-2">
          <Text className="text-left font-semibold w-full">Plastic</Text>
          <TextInput
            value={String(score?.plastic || 0)}
            keyboardType="numeric"
            onChangeText={(e) => handleOnchange(e, "plastic")}
            className="w-full font-semibold rounded-[10px] px-[12px] border py-2"
          />
        </View>
      </View>

      <Pressable
        onPress={handleSaveScore}
        className="bg-[#051c2e] rounded-xl p-4 w-auto justify-center items-center"
      >
        <Text className="text-white">Save</Text>
      </Pressable>
    </View>
  );
};

const DefaultScore = ({ count }: EditableProps) => {
  return (
    <View className="gap-y-6 p-6 w-full">
      <Text className="text-xl font-bold">{count?.can}</Text>
      <Text className="text-xl font-bold">{count?.plastic}</Text>
    </View>
  );
};
