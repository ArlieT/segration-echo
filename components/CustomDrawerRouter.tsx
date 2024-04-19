import { View, Text } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";

const CustomDrawerRouter = (props: any) => {
  const router = useRouter();
  console.log(props);
  console.log(props.routes);
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          style={{ backgroundColor: "black" }}
          label={"Admin Dashboard"}
          activeBackgroundColor="black"
          inactiveBackgroundColor="white"
          inactiveTintColor="#FF0000"
          labelStyle={{ color: "white" }}
          onPress={() => router.replace("/(auth)/signin")}
        />
        <DrawerItem
          label={"Students"}
          activeBackgroundColor="black"
          inactiveBackgroundColor="white"
          inactiveTintColor="#FF0000"
          labelStyle={{ color: "white" }}
          onPress={() => router.replace("/(admin)/users")}
        />
        <DrawerItem
          label={"Sign in"}
          activeBackgroundColor="black"
          inactiveBackgroundColor="white"
          inactiveTintColor="#FF0000"
          labelStyle={{ color: "white" }}
          onPress={() => router.replace("/(auth)/signin")}
        />
        <DrawerItem
          label={"Sign out"}
          activeBackgroundColor="black"
          inactiveBackgroundColor="white"
          inactiveTintColor="#FF0000"
          labelStyle={{ color: "white" }}
          onPress={() => router.replace("/(auth)/signin")}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerRouter;
