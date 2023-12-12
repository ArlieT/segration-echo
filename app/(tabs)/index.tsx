import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import UserBox from "../../components/UserBox";
import PaperBin from "../../components/bin/PaperBin";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const users = [
  {
    username: "test1",
    scores: {
      paper: 12,
      can: 32,
      plastic: 22,
    },
  },
  {
    username: "test2",
    scores: {
      paper: 12,
      can: 123,
      plastic: 4,
    },
  },
  {
    username: "test3",
    scores: {
      paper: 12,
      can: 1,
      plastic: 4,
    },
  },
  {
    username: "test4",
    scores: {
      paper: 12,
      can: 1,
      plastic: 4,
    },
  },
];
export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          borderRadius: 6,
          padding: 6,
          backgroundColor: "#fff",
          alignSelf: "flex-start",
          height: 60,
          width: 120,
        }}
      >
        <Text style={{ textAlign: "left", color: "black" }}>Humidity</Text>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>24.4h</Text>
      </View>
      <ScrollView
        style={{
          flex: 3,
          backgroundColor: "rgba(0,0,0,0)",
          width: "100%",
          height: "100%",
        }}
      >
        {users.map(({ username, scores }, index) => (
          <UserBox username={username} scores={scores} key={index} />
        ))}
      </ScrollView>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          backgroundColor: "#fff",
          width: "100%",
          gap: 12,
          padding: 4,
        }}
      >
        <PaperBin />
        <PaperBin />
        <PaperBin />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    gap: 4,
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
