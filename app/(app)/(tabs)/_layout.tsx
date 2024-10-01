import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import { hydrateAuth } from "../../../_store/useAuthStore";

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginTop: 10 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  hydrateAuth();
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
          title: "Admin Dashboard",
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
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          headerShown: false,
          tabBarLabel: "", // Remove the label

          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="[user]"
        options={{
          title: "",
          // title: (params?.user as string) || "User",
          headerShown: true,
          tabBarLabel: "",
          href: null,

          headerRight: () => (
            <Link className="font-bold text-lg pr-4" href="/">
              {params?.user}
            </Link>
          ),
          headerLeft: () => (
            <Link href="/users" asChild className="pl-4">
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="chevron-left"
                    // color={Colors["light"].text}
                    size={24}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
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
    padding: 26,
    borderRadius: 12,
  },
});
