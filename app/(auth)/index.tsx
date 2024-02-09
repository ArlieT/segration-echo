import { View, Text, StyleSheet } from "react-native";
import BottomSheetSignIn from "../../components/BottomSheetSignIn";
type TCredential = {
  username: string;
  password: string;
};

const index = () => {
  return (
    <View style={styles.container}>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    color: "white",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    color: "#fff",
  },
  error: {
    color: "red",
    alignSelf: "center",
    fontSize: 18,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 25,
    padding: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    color: "black",
  },
});
