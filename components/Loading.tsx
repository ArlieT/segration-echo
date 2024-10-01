import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../assets/animated/Trash.json")}
      />

      <Text className="font-bold text-lg text-center">Loading...</Text>
    </View>
  );
};

export default Loading;
