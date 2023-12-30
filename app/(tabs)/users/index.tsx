import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import UserBox from "../../../components/UserBox";
import { users } from "../../../constants/fakeusers";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";

export default function Users({}) {
  return (
    <SafeAreaView style={styles.container} className="">
      <View className="bg-white p-4 w-full">
        <Text className="text-black text-lg text-left w-full text-md">
          Users
        </Text>
      </View>

      <ScrollView
        className="space-y-2 w-full flex-1 mt-4"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {users.length ? (
          users.map(({ username, scores }, index) => (
            <React.Fragment key={index}>
              <UserBox username={username} scores={scores} key={index} />
              <UserBox username={username} scores={scores} key={index} />
              <UserBox username={username} scores={scores} key={index} />
              <UserBox username={username} scores={scores} key={index} />
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
    marginTop: 45,
    marginBottom: 10,
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
