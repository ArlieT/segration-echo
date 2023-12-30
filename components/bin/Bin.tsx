import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

const Bin = ({
  label,
  percentage,
  color,
}: {
  color: string;
  percentage: string;
  label: string;
}) => {
  const height = useSharedValue(Number(percentage));

  const handlePress = () => {
    height.value = withSpring(height.value + 10);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${height.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Test</Text>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.relativeContainer} className=" overflow-hidden">
        <View style={styles.absoluteContainer}>
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
        <Animated.View
          style={[styles.bin, { backgroundColor: color }, animatedStyle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    borderRadius: 8,
    height: "100%",
  },
  label: {
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    paddingVertical: 8,
  },
  relativeContainer: {
    position: "relative",
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
  },
  absoluteContainer: {
    position: "absolute",
    bottom: 0,
    top: 0,
    alignSelf: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 4,
    zIndex: 20,
  },
  percentageText: {
    position: "relative",
    zIndex: 10,
    color: "black",
  },
  bin: {
    height: 5,
    maxWidth: "100%",
    borderRadius: 8,
  },
});

export default Bin;
