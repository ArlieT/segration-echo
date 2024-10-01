import { View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const Splash = () => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View className="bg-red-500">
      {/* <LottieView
        source={require("../assets/Trash.json")}
        // progress={animationProgress.current}
        autoPlay
        loop
      /> */}
    </View>
  );
};

export default Splash;
