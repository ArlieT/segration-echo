import { StyleSheet } from "react-native";
import { Text, TextProps } from "./Themed";

export function BlueText(props: TextProps) {
  return <Text {...props} style={[styles.text, props.style]} />;
}

const styles = StyleSheet.create({
  text: {
    color: "#3F85EF",
  },
});
