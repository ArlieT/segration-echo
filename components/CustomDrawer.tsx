import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useAuth } from "../_store/useAuthStore";
import { StatusBar } from "expo-status-bar";

const CustomDrawerContent = ({ navigation }: any) => {
  const { signOut, role } = useAuth();

  const handleLogout = async () => {
    signOut();
    navigation.closeDrawer();
    navigation.navigate("Signin");
  };

  return (
    <DrawerContentScrollView>
      <StatusBar style="dark" />
      {/* Your existing Drawer.Screen components */}
      <View className="p-3 flex-1 h-[100vh]">
        <View className="flex-1">
          {role === "ADMIN" ? (
            <DrawerItem
              label="Admin Dashboard"
              onPress={() => navigation.navigate("Admin")}
            />
          ) : (
            <View className={`${role === ("ADMIN" as any) ? "hidden" : ""}`}>
              <DrawerItem
                label="My Profile"
                onPress={() => navigation.navigate("Student")}
              />
            </View>
          )}

          <View className={`${role === ("STUDENT" as any) ? "hidden" : ""}`}>
            <DrawerItem
              label="List of Students"
              onPress={() => navigation.navigate("Students")}
            />
          </View>

          <DrawerItem
            label="Information"
            onPress={() => navigation.navigate("Information")}
          />

          <View className="hidden">
            <DrawerItem
              label=""
              onPress={() => navigation.navigate("Signin")}
            />
            <DrawerItem
              label=""
              onPress={() => navigation.navigate("Signup")}
            />
          </View>
        </View>

        {/* Custom Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-[#051C2E] rounded-md"
        >
          <View
            style={{
              padding: 16,
            }}
          >
            <Text className="text-white font-bold text-center">Logout</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={handleLogin}
          className="bg-[#051C2E] rounded-md"
        >
          <View
            style={{
              padding: 16,
            }}
          >
            <Text className="text-white font-bold text-center">Login</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
