import { BackHandler, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import UserBox from "../../../components/UserBox";
import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect } from "react";
import firebaseRef from "../../../firebase/ref";
import { useList } from "react-firebase-hooks/database";
import { useNavigation } from "expo-router";

export default function Users({}) {
  const { navigate } = useNavigation();
  const [studentList, loading, error] = useList(firebaseRef(`users/STUDENT`));

  const studentArray: any[] = [];
  studentList?.forEach((childSnapshot) => {
    studentArray.push({
      key: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });

  const sortedStudentArray = studentArray?.sort((a, b) => {
    const totalScoreA =
      (a?.bin_score?.can || 0) +
      (a?.bin_score?.plastic || 0) +
      (a?.bin_score?.paper || 0);
    const totalScoreB =
      (b?.bin_score?.can || 0) +
      (b?.bin_score?.plastic || 0) +
      (b?.bin_score?.paper || 0);

    return totalScoreB - totalScoreA;
  });

  useEffect(() => {
    const backAction = () => {
      // Handle custom back button behavior here
      // For example, prevent going back to the previous screen:
      // navigation.navigate('Home'); // Navigate to a specific screen
      navigate("Admin" as never);
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container} className="">
      <View className="w-full">
        <Text className="bg-[#fbfbfb] font-semibold text-black text-left text-base">
          Student list
        </Text>
      </View>
      <ScrollView
        className="space-y-2 w-full flex-1 mt-2"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {sortedStudentArray?.map((v, index) => (
          <UserBox
            username={v?.username}
            bin_score={v?.bin_score}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbfbfb",
    padding: 10,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
