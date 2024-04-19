import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Slot, SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import AuthProvider from "../components/AuthProvider";
import BottomSheet from "@gorhom/bottom-sheet";
import useBottomSheetGlobal from "../_store/useBottomSheetGloba";
import { TabBarIcon } from "./(student)/_layout";
import { Drawer } from "expo-router/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "../_store/useAuthStore";
import CustomDrawerRouter from "../components/CustomDrawerRouter";
import Signup from "./(auth)/signup";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}
function RootLayoutNav() {
  const { bottomSheetRef, snapeIndex, setBottomSheet } = useBottomSheetGlobal();
  const sheetRef2 = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25", "50%", "90"], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef2?.current?.snapToIndex(index);
  }, []);

  useEffect(() => {
    if (snapeIndex !== -1) {
      setBottomSheet(sheetRef2);
      handleSnapPress(snapeIndex);
    }
  }, [snapeIndex]);
  const colorScheme = useColorScheme();

  const { token } = useAuth();

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <Drawer
          screenOptions={{ headerShown: true }}
          drawerContent={CustomDrawerRouter}
        >
          <Drawer.Screen
            name="(admin)"
            options={{ title: "Admin Dashboard" }}
          />
          <Drawer.Screen name="(student)" options={{ title: "Students" }} />
          <Drawer.Screen
            name="(auth)"
            options={{ headerShown: false, drawerInactiveTintColor: "white" }}
          />
        </Drawer>
        {/* <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer drawerContent={CustomDrawerRouter}>
            <Drawer.Screen
              name="(admin)" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "Admin Dashboard",
                title: "Admin Dashboard",
              }}
            />

            <Drawer.Screen
              name="(student)" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "Students",
                title: "Students",
              }}
            />
          </Drawer>
        </GestureHandlerRootView> */}
      </AuthProvider>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

/**
 * 
 * <AuthProvider>
      <Slot />

      <BottomSheet
        index={-1}
        ref={sheetRef2}
        animateOnMount={false}
        backgroundStyle={{ backgroundColor: "#051c2e" }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
        enablePanDownToClose
        snapPoints={snapPoints}
      >
        <View style={styles.contentContainer} className=" pt-10">
          <View className="rounded-md w-4/5 flex-row p-4 justify-center items-center bg-white">
            <Text className="text-lg font-semibold">Score updated &nbsp;</Text>
            <Text>
              <TabBarIcon name="check-circle" color="black" />,
            </Text>
          </View>
        </View>
      </BottomSheet>
    </AuthProvider>
 * 
 * 
 */
