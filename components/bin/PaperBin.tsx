import { StyleSheet, Text, View } from "react-native";

const PaperBin = () => {
  return (
    <View style={styles.contianer}>
      <Text>test</Text>
    </View>
  );
};

export default PaperBin;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgba(63, 133, 239, 0.05)",
    borderRadius: 6,
    padding: 6,
  },
});
