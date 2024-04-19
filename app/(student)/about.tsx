import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const about = () => {
  return (
    <SafeAreaView>
      <Link href={"/(auth)/signin"}>logout</Link>
    </SafeAreaView>
  );
};

export default about;
