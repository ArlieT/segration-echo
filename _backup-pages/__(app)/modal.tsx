import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../_store/useAuthStore";

const InformationTab = () => {
  const { signOut, status } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to Eco Arcade</Text>
      </View>
      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Eco Arcade is your go-to solution for effective waste management and
          environmental monitoring. Our application empowers users to track and
          optimize waste disposal processes while ensuring sustainability and
          efficiency.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.paragraph}>
          - Real-time monitoring of bin occupancy levels for paper, plastic, and
          cans.
          {"\n"}- Environmental parameters tracking including temperature and
          humidity.
          {"\n"}- Seamless integration with IoT devices for automated data
          collection.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Access</Text>
        <Text style={styles.paragraph}>
          - **Students:** individual scores to track your environmental
          contributions.
          {"\n"}- **Admins:** Manage student information, access functionalities
          for application management.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get Started</Text>
        <Text style={styles.paragraph}>
          Download Eco Arcade now and embark on a journey towards a greener and
          more sustainable future!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
  },
});

export default InformationTab;
