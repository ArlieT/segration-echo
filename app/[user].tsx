import React, { useEffect, useState } from "react";
import { BackHandler, Pressable, Text, TextInput, View } from "react-native";
import { useObject } from "react-firebase-hooks/database";

import { FontAwesome } from "@expo/vector-icons";
import { set } from "firebase/database";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import { useAuth } from "../_store/useAuthStore";
import firebaseRef from "../firebase/ref";
import Score from "../components/Score";
import { TBinScore } from "./(student)";
import useBottomSheetGlobal from "../_store/useBottomSheetGloba";

const Student = ({ route }: { route: { params: { username: string } } }) => {
  const { username } = route.params;
  const { token: user } = useAuth();
  const [student, loading, error] = useObject(
    firebaseRef(`users/STUDENT/${username || user?.username}`)
  );

  const [score] = useObject(
    firebaseRef(`users/STUDENT/${username || user?.username}/bin_score`)
  );

  console.log("usernameeeee ", username);
  const { navigate } = useNavigation();

  useEffect(() => {
    const backAction = () => {
      // Handle custom back button behavior here
      // For example, prevent going back to the previous screen:
      // navigation.navigate('Home'); // Navigate to a specific screen
      navigate("Students" as never);
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className=" w-full h-full p-2"
    >
      <MyProfile
        username={username}
        count={student?.val()?.bin_count}
        percentage={student?.val()?.bin_percentage}
        score={score?.val()}
      />
    </ScrollView>
  );
};

export default Student;

type Props = {
  username?: string;
  percentage?: TBinScore;
  count: TBinScore;
  score: TBinScore;
};

const MyProfile = ({ username, count, score }: Props) => {
  const { token: user } = useAuth();

  return (
    <View className="flex-1 rounded-xl h-auto w-full py-4 justify-center items-center bg-white">
      <View className="h-[64px]">
        <FontAwesome name="user-circle" size={64} />
      </View>
      <View className="flex-1 space-y-4 px-4 w-full">
        <View className="flex-row">
          <Text>Student name: </Text>
          <Text className="font-bold">{username}</Text>
        </View>
        <View className="flex-row">
          <Text>Role: </Text>
          <Text className="font-bold">{"Student"}</Text>
        </View>
        {user?.role === "ADMIN" ? (
          <View className="bg-white w-full flex-1 flex-col flex rounded-lg">
            <Text className="text-lg text-left font-bold w-full mb-1">
              Score:
            </Text>
            <View className="flex h-4/5 flex-row">
              <Score label="Can" score={score?.can || 0} />
              <Score label="Plastic" score={score?.plastic || 0} />
              <Score label="Paper" score={score?.paper || 0} />
            </View>
          </View>
        ) : (
          <View className="bg-white w-full flex-[0.4] flex-col py-2 flex rounded-lg">
            <Text className="text-lg text-left font-bold w-full mb-1">
              My Score:
            </Text>
            <View className="flex h-4/5 flex-row">
              <Score label="Can" score={score?.can || 0} />
              <Score label="Plastic" score={score?.plastic || 0} />
              <Score label="Paper" score={score?.paper || 0} />
            </View>
            <View className="">
              <AnimatedLottieView
                autoPlay
                resizeMode="cover"
                style={{
                  width: "auto",
                  height: "auto",
                  opacity: 0.2,
                  margin: "auto",
                  top: 7,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                source={require("../assets/animated/Trash.json")}
              />
            </View>
          </View>
        )}
      </View>

      {/* <View className="w-full border-t border-black/40" /> */}

      <EditableScore count={count} username={username} />
    </View>
  );
};
export { MyProfile };

type EditableProps = {
  count?: TBinScore;
  username?: string;
};

const EditableScore = ({ count, username }: EditableProps) => {
  const [student, loading, error] = useObject(
    firebaseRef(`users/STUDENT/${username}`)
  );

  console.log({ username });

  const [score, setScore] = useState<TBinScore | undefined>(undefined);
  const { bottomSheetRef, setSnapeIndex, snapeIndex } = useBottomSheetGlobal();

  useEffect(() => {
    if (student) setScore(student?.val().bin_score);
  }, [student]);

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

  const { token } = useAuth();

  if (token?.role === "STUDENT") return;

  return (
    <View className="bg-white px-4 flex-[1.5] w-full">
      <View className="flex gap-y-2">
        <Text className="text-lg text-left font-bold w-full">Edit Score</Text>
        <View className="flex justify-around items-center gap-y-2">
          <Text className="text-left font-semibold w-full">Can:</Text>
          <TextInput
            editable={token?.role === "ADMIN"}
            value={String(score?.can || 0)}
            keyboardType="numeric"
            onChangeText={(e) => handleOnchange(e, "can")}
            className="w-full rounded-[10px] px-[12px] border py-2"
          />
        </View>
        <View className="flex justify-around items-center gap-y-2">
          <Text className="text-left font-semibold w-full">Paper</Text>
          <TextInput
            editable={token?.role === "ADMIN"}
            value={String(score?.paper || 0)}
            keyboardType="numeric"
            onChangeText={(e) => handleOnchange(e, "paper")}
            className="w-full rounded-[10px] px-[12px] border py-2"
          />
        </View>
        <View className="flex justify-around items-center gap-y-2">
          <Text className="text-left font-semibold w-full">Plastic</Text>
          <TextInput
            editable={token?.role === "ADMIN"}
            value={String(score?.plastic || 0)}
            keyboardType="numeric"
            onChangeText={(e) => handleOnchange(e, "plastic")}
            className="w-full rounded-[10px] px-[12px] border py-2"
          />
        </View>
      </View>

      {token?.username === username ||
        (token?.role === "ADMIN" && (
          <Pressable
            onPress={handleSaveScore}
            className="bg-[#051c2e] mt-4 rounded-xl p-4 w-auto justify-center items-center"
          >
            <Text className="text-white">Save</Text>
          </Pressable>
        ))}
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
