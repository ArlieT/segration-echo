import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Users", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="[user]"
        options={{ title: "Users", headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default _layout;
