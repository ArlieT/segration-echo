import { useColorScheme } from "react-native";
import { useAuth } from "../../_store/authStore";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../../components/CustomDrawer";
import { useRouter } from "expo-router";
import InformationTab from "./modal";
import { StatusBar } from "expo-status-bar";
import Signin from "./signin";
import Signup from "./signup";
import UserScreen from "./(student)";
import AdminScreen from "./(tabs)";
import Users from "./(tabs)/users";
import Student from "./[user]";

function AppEntry({ navigation }: any) {
  const colorScheme = useColorScheme();

  const Drawer = createDrawerNavigator();

  const router = useRouter();
  const handleModal = () => {
    router.replace("/(app)/modal");
  };

  const { signOut, signIn, status, role } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      detachInactiveScreens
      screenOptions={{ drawerStatusBarAnimation: "none" }}
    >
      <Drawer.Screen name="Admin" component={AdminScreen} />
      <Drawer.Screen name="Student" component={UserScreen} />
      <Drawer.Screen name="Information" component={InformationTab} />
      <Drawer.Screen name="Students" component={Users} />
      <Drawer.Screen name="User" component={Student as any} />
      {/* empty label / label == invisible */}
      <Drawer.Screen
        name="Signin"
        options={{ title: "", headerShown: false }}
        component={Signin}
      />
      <Drawer.Screen
        name="Signup"
        options={{ headerShown: false }}
        component={Signup}
      />
    </Drawer.Navigator>
    //DEFAULT DRAWER
    // <Drawer
    //   detachInactiveScreens
    //   screenOptions={{ drawerStatusBarAnimation: "none" }}
    // >
    //   <Drawer.Screen
    //     options={{ drawerLabel: "Students", title: "Students" }}
    //     name="(student)"
    //   />
    //   <Drawer.Screen
    //     name="(tabs)"
    //     options={{ drawerLabel: "Admin", title: "Admin Dashboard" }}
    //   />
    //   <Drawer.Screen name="modal" options={{ drawerLabel: "", title: "" }} />
    //   //BUtton
    // </Drawer>
  );
}
export default AppEntry;
{
  /* <Stack>
        {ROLE === "ADMIN" && (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}

        {ROLE === "STUDENT" && (
          <Stack.Screen name="(student)" options={{ headerShown: false }} />
        )}

        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack> */
}
// drawerContent={() => (
//   <SafeAreaView className="flex-1 p-3">
//     <View className="flex-1 p-1">
//       <Text>test</Text>
//     </View>
//     <View className="">
//       <Pressable onPress={() => {}} className="rounded p-3 bg-[#051c2e] ">
//         <Text className="text-white font-bold text-center">Logout</Text>
//       </Pressable>
//       {/* <Link
//           href={"/(auth)/signin"}
//           className="rounded text-center text-white p-3 bg-[#051c2e] "
//         >
//           logout
//         </Link> */}
//     </View>
//   </SafeAreaView>
// )}
