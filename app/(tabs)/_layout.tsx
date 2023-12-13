import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 62,
          // borderRadius: 32,
        },
        tabBarActiveTintColor: Colors["light"].tint,
        tabBarActiveBackgroundColor: "rgba(63, 133, 239, 0.10)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Bins",
          tabBarIcon: ({ color }) => <TabBarIcon name="trash" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors["light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  active: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(63, 133, 239, 0.10)",
    padding: 24,
    borderRadius: 12,
  },
});
