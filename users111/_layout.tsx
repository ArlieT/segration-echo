import React from "react";
import { Stack, Tabs } from "expo-router";
import { TabBarIcon } from "../_backup-pages/__(app)/(admin)/_layout";

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
