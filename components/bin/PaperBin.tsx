import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Circle, Path, Rect, Svg, SvgUri } from "react-native-svg";
import Square from "./Squate";
const PaperBin = ({ label }: { label: string }) => {
  const height = useSharedValue(0);
  const r = useSharedValue(10);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const handlePress = () => {
    // Increase the trash level with a spring animation
    height.value = withSpring(height.value + 10);
  };
  const resetBin = () => {
    height.value = withSpring((height.value = 0));
  };

  const handlePressr = () => {
    r.value += 10;
  };

  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value),
  }));

  useEffect(() => {
    console.log(height);
  }, [height]);

  return (
    <View style={styles.container}>
      {/* Trash Bin Shape */}
      <Button onPress={resetBin} title="reset" />
      <Text>{height.value}</Text>
      <View className="h-4 w-4 rounded-full relative top-2 bg-gray-500 mx-auto" />
      {/* <View className="w-full p-4">
        <Image source={trash} className="h-full w-full" />
      </View> */}
      <Text style={styles.label}>{label}</Text>

      <View style={styles.buttonContainer}>
        <Button onPress={handlePress} title="Add Trash" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 22,
  },
  binShape: {
    width: 100,
    height: 150,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    overflow: "hidden",
  },
  binTop: {
    height: 20,
    zIndex: 10,
    backgroundColor: "#0e77ab",
  },
  binBody: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    position: "relative",
  },
  trashLevel: {
    maxHeight: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#8ca8d2",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PaperBin;
