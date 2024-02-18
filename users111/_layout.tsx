import React from "react";
import { Stack, Tabs } from "expo-router";
import { TabBarIcon } from "../app/(app)/(tabs)/_layout";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[user]"
        getId={({ params }) => String(Date.now())}
        options={{ title: "Users", headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default _layout;
