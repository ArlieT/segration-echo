import { Pressable, Text, View } from "react-native";
import React, { Component } from "react";
import { Link, Stack, Tabs } from "expo-router";
import { TabBarIcon } from "../(tabs)/_layout";
import { FontAwesome } from "@expo/vector-icons";

export class AuthLayout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen name="auth"></Stack.Screen>;
      </Stack>
    );
  }
}

export default AuthLayout;
