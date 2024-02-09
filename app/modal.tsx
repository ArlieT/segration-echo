import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../_store/authStore";

const InformationTab = () => {
  const { signOut, status } = useAuth();
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          signOut();
        }}
      >
        Sign out {status}
      </Text>
      <View
        style={{
          backgroundColor: "#051c2e",
          alignItems: "baseline",
          padding: 10,
          borderRadius: 12,
        }}
      >
        <Text style={styles.title}>Eco Arcade Information</Text>
      </View>
      <View style={styles.separator} />

      <Text style={styles.paragraph}>
        Welcome to the Arcade eco bin monitoring App! This app allows you to
        keep track of different types of bins, including paper, plastic, and can
        bins. Additionally, it provides information on temperature and humidity
        levels.
        {"\n\n"}- **Bin Types:** - Paper Bin - Plastic Bin - Can Bin
        {"\n\n"}- **Environmental Parameters:** - Temperature - Humidity
        {"\n\n"}
        Use this information to monitor the status of your bins and ensure
        proper waste management.
        {"\n\n"}**Key Features:**
        {"\n"}- Real-time monitoring of bin occupancy
        {"\n"}- Environmental conditions for optimal waste disposal
        {"\n\n"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default InformationTab;
