import { StyleSheet } from "react-native";
import EditScreenInfo from "../../../components/EditScreenInfo";
import { Text, View } from "../../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import UserBox from "../../../components/UserBox";
import { users } from "../../../constants/fakeusers";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View className="bg-[#fbfbfb] h-[38%]">
        <Text className="text-black p-2 text-left w-full text-md font-medium">
          Top 3
        </Text>
        <ScrollView className="space-y-2">
          {users.length ? (
            users.map(({ username, scores }, index) => (
              <UserBox username={username} scores={scores} key={index} />
            ))
          ) : (
            <View>No data.</View>
          )}
        </ScrollView>
      </View>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbfbfb",
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
