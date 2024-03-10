import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheetSignIn from "../../components/BottomSheetSignIn";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableHighlight } from "react-native-gesture-handler";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useAuth } from "../../_store/authStore";
import { TCredential } from "../../_store/_utils/auth";
import AnimatedLottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

const Signin = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [credential, setCredential] = useState<TCredential>({
    username: "",
    password: "",
    role: ""
  });

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
    //TODO REPLACE WITH ACUTLA USER
    if (credential.username === "admin" && credential.password === "admin") {
      setTimeout(() => {
        signIn({ role: "ADMIN", ...credential });

        router.push("/");
        setCredential({
          username: "",
          password: ""
        });
      }, 1500);
    } else {
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    //RESET CREDENTIAL
    return () => {
      setCredential({
        username: "",
        password: ""
      });
    };
  }, []);

  return (
    <View style={styles.container} className="border">
      <StatusBar style="light" />
      <View style={styles.contentContainer}>
        <AnimatedLottieView
          autoPlay
          style={{
            width: 100,
            height: 100
          }}
          source={require("../../assets/animated/sign-in-lottie.json")}
        />
        <Text style={styles.containerHeadline}>Sign in</Text>
        <View className="w-full justify-center items-center p-4">
          <Text className="text-white text-lg text-left w-full">Username</Text>

          <TextInput
            onChangeText={(e) => setCredential({ ...credential, username: e })}
            style={styles.input}
            className="w-full border border-white"
          />
          <Text className="text-white text-lg text-left w-full">Password</Text>
          <View className="block justify-center items-center relative  w-full">
            <TextInput
              onChangeText={(e) =>
                setCredential({ ...credential, password: e })
              }
              secureTextEntry={isShowPassword}
              style={styles.input}
              className="w-full border border-white"
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
          <View className=" flex-row my-6 justify-center items-center flex">
            <Text className="text-white">Don't have an account?</Text>
            {/* <Pressable onPress={() => handleBottomSheet("signup")}>
              <Text className="text-blue-500">&nbsp; Sign up</Text>
            </Pressable> */}
          </View>
        </View>
      </View>
      {/* <BottomSheetSignIn /> */}
    </View>
  );
};

export default Signin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#051c2e"
  },
  contentContainer: {
    height: "100%",
    overflowY: "scroll",
    flex: 1,
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    width: "100%"
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#fff"
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
    // backgroundColor: "rgba(151, 151, 151, 0.25)",
    backgroundColor: "#051c2e",
    color: "#fff"
  },
  error: {
    color: "red",
    alignSelf: "center",
    fontSize: 18
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 25,
    padding: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%"
  },
  buttonText: {
    fontWeight: "600",
    color: "black"
  }
});
