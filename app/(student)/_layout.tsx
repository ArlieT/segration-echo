import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { useAuth } from "../../_store/useAuthStore";

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginTop: 10 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { token, hydrate } = useAuth();
  // hydrate(); //HYDRATE AUTH

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 68,
          borderRadius: 32,
          margin: 10,
          backgroundColor: "#051C2E",
          justifyContent: "center",
          alignItems: "center",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `Student ${token?.username}`,
          tabBarLabel: "Students", // Remove the label
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
      <Tabs.Screen
        name="about"
        options={{
          headerShown: true,
          tabBarLabel: "", // Remove the label
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      />
      <Tabs.Screen
        name="[user]"
        getId={({ params }) => String(Date.now())}
        options={{
          headerShown: false,
          tabBarLabel: "", // Remove the label
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
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
    padding: 26,
    borderRadius: 12,
  },
});
