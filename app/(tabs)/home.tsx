import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import UserBox from "../../components/UserBox";
import { users } from "../../constants/fakeusers";
import Splash from "../../components/Splash";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Splash />
      <View className="bg-[#fbfbfb] h-[38%]">
        <Text className="text-black text-left w-full pl-2 text-md font-medium">
          Top 3
        </Text>
        <ScrollView className="space-y-2">
          {users.map(({ username, scores }, index) => (
            <UserBox username={username} scores={scores} key={index} />
          ))}
        </ScrollView>
      </View>
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
