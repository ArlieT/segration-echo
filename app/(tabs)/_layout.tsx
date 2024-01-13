import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginTop: 10 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 64,
          borderRadius: 32,
          margin: 10,
          backgroundColor: "#051C2E",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarLabel: "", // Remove the label
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    // color={Colors["light"].text}
                    size={24}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabel: "", // Remove the label
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="users"
        options={{
          href: {
            pathname: "/users",
          },
          title: "Users",
          headerShown: false,
          tabBarLabel: "", // Remove the label
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
