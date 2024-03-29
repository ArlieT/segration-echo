import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import UserBox from "../../../components/UserBox";
import { users } from "../../../constants/fakeusers";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";
import firebaseRef from "../../../firebase/ref";
import { useList } from "react-firebase-hooks/database";

export default function Users({}) {
  const [studentList, loading, error] = useList(firebaseRef(`users/STUDENT`));
  return (
    <SafeAreaView style={styles.container} className="">
      <ScrollView
        className="space-y-2 w-full p-2 flex-1 mt-4"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {studentList?.map.length ? (
          studentList.map((v, index) => (
            <React.Fragment key={index}>
              <UserBox
                username={v.val()?.username}
                bin_score={v.val()?.bin_score}
                key={index}
              />
            </React.Fragment>
          ))
        ) : (
          <View>No data.</View>
        )}
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
