import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import { TCredential } from "../_store/_utils/auth";
import { useAuth } from "../_store/authStore";
import { Link } from "expo-router";

export default function BottomSheetSignIn() {
  const { status, signOut, signIn } = useAuth();
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [credential, setCredential] = useState<TCredential>({
    username: "",
    password: "",
  });

  const snapPoints = useMemo(() => ["100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleSubmit = async () => {
    const { username, password } = credential;
    if (username.length < 4) {
      setError("Username must be at least 4 characters long");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    if (credential.username === "admin" && credential.password === "admin") {
      setTimeout(() => {
        signIn(credential);
        setCredential({
          username: "",
          password: "",
        });
      }, 1500);
    } else {
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    return () => {
      setCredential({
        username: "",
        password: "",
      });
    };
  }, []);
  return (
    status !== "signIn" && (
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        containerStyle={{
          zIndex: 9999,
        }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{ backgroundColor: "#051c2e" }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Sign in</Text>
          <View className="w-full justify-center items-center p-4">
            <Text className="text-white text-lg text-left w-full">
              Username
            </Text>
            <BottomSheetTextInput
              value={credential.username}
              onChange={(e) =>
                setCredential({ ...credential, username: e.nativeEvent.text })
              }
              style={styles.input}
              className="w-full"
            />
            <Text className="text-white text-lg text-left w-full">
              Password
            </Text>
            <View className="block justify-center items-center relative  w-full">
              <BottomSheetTextInput
                secureTextEntry={isShowPassword}
                value={credential.password}
                onChange={(e) =>
                  setCredential({ ...credential, password: e.nativeEvent.text })
                }
                style={styles.input}
              />
              <Pressable
                onPress={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3 p-2"
              >
                <FontAwesome name="eye-slash" color="#fff" size={18} />
              </Pressable>
            </View>

            <Text style={styles.error}>{error}</Text>
            <TouchableHighlight onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
            <Text className="text-white my-6">
              Don't have an account?
              <Link href={"/(auth)/"} className="text-blue-500">
                &nbsp; Sign up
              </Link>{" "}
            </Text>
          </View>
        </View>
      </BottomSheet>
    )
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    color: "white",
    justifyContent: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    color: "#fff",
  },
  error: {
    color: "red",
    alignSelf: "center",
    fontSize: 18,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 25,
    padding: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontWeight: "600",
    color: "black",
  },
});
