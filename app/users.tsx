import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";
import EditScreenInfo from "../components/EditScreenInfo";

export default function TabTwoScreen() {
  console.log("test");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab third</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <Link href={"/users/test1"} style={{ color: "#fff" }}>
          dynamic route
        </Link>
      </View>
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
