import { StyleSheet } from "react-native";
import { Text, TextProps } from "./Themed";

export function BlueText(props: TextProps) {
  return <Text {...props} className="text-blue-500" />;
}

export function BlackText(props: TextProps) {
  return <Text {...props} className="text-[#051c2e]" />;
}
