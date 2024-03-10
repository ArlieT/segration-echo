import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Redirect, Slot, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Button, Pressable, Text, View, useColorScheme } from "react-native";
import AuthProvider from "../components/AuthProvider";
import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../_store/authStore";
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import useBottomSheetController from "../_store/useBottomSheet";

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
  const colorScheme = useColorScheme();
  // const ROLE = token?.role?.toLocaleUpperCase()
  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const { setAction, setActionClose } = useBottomSheetController();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();
  const snapeToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(0);
  useEffect(() => {
    setActionClose(handleOpenPress);
    setAction(snapeToIndex);
  }, []);

  return (
    <AuthProvider>
      <Slot />
      {/* <Button title="Open" onPress={() => snapToIndex(0)} /> */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backdropComponent={renderBackdrop}
        containerStyle={{
          zIndex: 9999,
          borderWidth: 1,
        }}
        backgroundStyle={{ backgroundColor: "#051c2e" }}
        containerHeight={{ value: 1000 }}
      >
        <View className="border">
          <Text className="text-white">Awesome Bottom Sheet 🎉</Text>
          <Button title="Close" onPress={handleClosePress} />
        </View>
      </BottomSheet>
    </AuthProvider>
  );
}
