import { useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
type PaperBinProps = {
  label: string;
};
const PaperBin = ({ label }: PaperBinProps) => {
  // const fadeAnim = useRef(new Animated.Value(0)).current; // Initial
  const height = useSharedValue(100);
  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 10000,
  //     useNativeDriver: true,
  //   }).start();
  // }, [fadeAnim]);

  const handlePress = () => {
    height.value = withSpring(height.value + 10);
  };

  return (
    <View
      className="flex mx-1 border flex-col items-center justify-center"
      style={styles.contianer}
    >
      <Text className="self-center text-blue-500">{label}</Text>
      <View className="flex-1 flex justify-center items-center">
        <Text>this should be center</Text>
      </View>
      <Animated.View // Special animatable View
        className={"bg-black"}
        style={{
          // opacity: fadeAnim, // Bind opacity to animated value
          width: 100,
          height,
        }}
      />
      <Text>view</Text>
      <View className="text-black">
        <Button onPress={handlePress} title="Click me" />
      </View>
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
