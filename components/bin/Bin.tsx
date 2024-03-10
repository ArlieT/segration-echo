import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle
} from "react-native-reanimated";

const Bin = ({
  label,
  percentage,
  count,
  color,
  setModal,
  setInfo
}: {
  color: string;
  percentage?: string;
  count?: string;
  label: string;
  setModal: (b: boolean) => void;
  setInfo: (i: any) => void;
}) => {
  const [localPercentage, setLocalPercentage] = useState(0);
  const height = useSharedValue(localPercentage);

  useEffect(() => {
    const percentageParsed = Number(percentage);
    console.log({ percentageParsed });
    setTimeout(() => {
      if (percentageParsed === 1) {
        setLocalPercentage(30);
      } else if (percentageParsed === 2) {
        setLocalPercentage(50);
      } else if (percentageParsed === 3) {
        setLocalPercentage(100);
      }
    }, 1000);
  }, [percentage]);

  useEffect(() => {
    height.value = withSpring(localPercentage);
  }, [localPercentage]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${height.value}%`
    };
  });

  const handlePressBin = () => {
    setModal(true);
    setInfo({ count, percentage: localPercentage, label });
  };

  //testing animation
  const handlePress = () => {
    height.value = withSpring(height.value + 10);
  };

  return (
    <>
      <View style={styles.container} className="mx-[1px]">
        {/* <TouchableOpacity onPress={handlePress}>
          <Text>test</Text>
        </TouchableOpacity> */}
        <Text className="text-[#051c2e]  shadow-md font-bold z-10 inset-x-0 text-lg  m-auto text-center">
          {localPercentage ?? 0}%
        </Text>
        <TouchableOpacity
          className=" overflow-hidden"
          style={styles.relativeContainer}
          onPress={handlePressBin}
        >
          <Animated.View
            style={[
              styles.bin,
              {
                position: "absolute",
                bottom: 0,
                borderWidth: 1,
                backgroundColor: color,
                width: "100%"
              },
              animatedStyle
            ]}
          />
        </TouchableOpacity>
        <View style={{}}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    width: "95%",
    borderRadius: 8,
    height: "100%",
    textAlign: "center"
  },
  label: {
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    paddingVertical: 8
  },
  relativeContainer: {
    position: "relative",
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(123,123,0,0.1)",
    borderRadius: 8,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  absoluteContainer: {
    position: "absolute",
    bottom: 0,
    top: 0,
    alignSelf: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 4,
    zIndex: 20
  },
  percentageText: {
    position: "relative",
    zIndex: 10,
    color: "black",
    textAlign: "left"
  },
  bin: {
    height: 5,
    maxWidth: "100%",
    borderRadius: 4
  }
});

export default Bin;
