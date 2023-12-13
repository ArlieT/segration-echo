import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import UserBox from "../../components/UserBox";
import PaperBin from "../../components/bin/PaperBin";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { users } from "../../constants/fakeusers";

export default function TabOneScreen() {
  console.log("index");
  return (
    <View
      className="bg-[#fbfbfb] border flex justify-center items-center h-full max-h-[100vh]"
      // style={styles.container}
    >
      <ScrollView
        className="border px-2 py-4 border-red-400 space-y-2"
        contentContainerStyle={{
          // height: "100%",
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderRadius: 6,
            padding: 6,
            backgroundColor: "#fff",
            alignSelf: "flex-start",
            height: 120,
            width: 100,
          }}
        >
          <Text className="text-black place-content-start self-start">
            Humidity
          </Text>
          <Text
            className="inset-0 m-auto"
            style={{ fontSize: 24, fontWeight: "700", color: "black" }}
          >
            24.4h
          </Text>
        </View>
        <View className="border border-blue-400 bg-[#fbfbfb] h-[40%]">
          <Text className="text-black text-left w-full p-2 pl-2 text-md font-medium">
            Top 3
          </Text>
          <ScrollView
            // className="space-y-2"
            contentContainerStyle={{ height: "100%" }}
          >
            {users.map(({ username, scores }, index) => (
              <UserBox username={username} scores={scores} key={index} />
            ))}
          </ScrollView>
        </View>
        <View className="flex-1 p-2 h-full flex flex-row border bg-[#fbfbfb]">
          <PaperBin label="Plactic Bin" />
          <PaperBin label="Paper Bin" />
          <PaperBin label="Can Bin" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 1,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
