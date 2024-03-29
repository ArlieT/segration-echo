import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useAuth } from "../../_store/useAuthStore";
import { TCredential } from "../../_store/_utils/auth";
import AnimatedLottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useList } from "react-firebase-hooks/database";
import firebaseRef from "../../firebase/ref";
import { DataSnapshot } from "firebase/database";

const Signin = ({ navigation }: any) => {
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [credential, setCredential] = useState<TCredential>({
    username: "",
    password: "",
    role: "",
  });

  const [adminSnapshot] = useList(firebaseRef("users/ADMIN"));
  const [studentSnapshot] = useList(firebaseRef("users/STUDENT"));
  const [users, setUsers] = useState<DataSnapshot[] | undefined>([]);

  useEffect(() => {
    setUsers([...(adminSnapshot || []), ...(studentSnapshot || [])]);
  }, [studentSnapshot, adminSnapshot]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const { username, password } = credential;

    // Validate username and password length
    if (username.length <= 3) {
      setError("Username must be at least 4 characters long");
      setIsSubmitting(false);
      return;
    }
    if (password.length <= 3) {
      setError("Password must be at least 4 characters long");
      setIsSubmitting(false);
      return;
    }
    // console.log("test__ ", users);

    // console.log("users: ", users?.[0]?.val()?.username);

    // Check if users data is available
    console.log({ credential });

    const user = users?.find(
      (user) =>
        user?.val()?.username === username && user?.val()?.password === password
    );

    console.log({ users });

    signIn(user?.val());

    if (user) {
      setTimeout(() => {
        if (user?.val()?.role === "ADMIN") {
          navigation.navigate("Admin");
        } else if (user?.val()?.role === "STUDENT") {
          navigation.navigate("Student");
        }
      }, 1200);
    } else {
      setError("Invalid username or password");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    //RESET CREDENTIAL
    return () => {
      setCredential({
        username: "",
        password: "",
      });
    };
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <View style={styles.container} className="border">
      <StatusBar style="light" />
      <View style={styles.contentContainer}>
        <AnimatedLottieView
          autoPlay
          style={{
            width: 100,
            height: 100,
          }}
          source={require("../../assets/animated/sign-in-lottie.json")}
        />

        <Text style={styles.containerHeadline}>Sign in</Text>
        <View className="w-full justify-center items-center p-4">
          <Text className="text-white text-lg text-left w-full">Username</Text>
          <TextInput
            value={credential.username}
            onChangeText={(e) => setCredential({ ...credential, username: e })}
            style={styles.input}
            className="w-full "
          />
          <Text className="text-white text-lg text-left w-full">Password</Text>

          <View className="block justify-center items-center relative  w-full">
            <TextInput
              value={credential.password}
              onChangeText={(e) =>
                setCredential({ ...credential, password: e })
              }
              secureTextEntry={isShowPassword}
              style={styles.input}
              className="w-full"
            />

            <Pressable
              onPress={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-3 p-2"
            >
              <FontAwesome name="eye-slash" color="#fff" size={18} />
            </Pressable>
          </View>
          <Text style={styles.error}>{error}</Text>
          <View className="my-2">
            <TouchableHighlight
              onPress={handleSubmit}
              className="w-full border bg-white rounded-xl px-6 py-4 "
            >
              <Text className="text-center text-[#051c2e] font-bold w-full">
                {isSubmitting ? "Submitting..." : "Sign in"}
              </Text>
            </TouchableHighlight>
          </View>
          <View className=" flex-row my-6 justify-center items-center flex">
            <Text className="text-white">Don't have an account?&nbsp; </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text className="text-blue-500">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#051c2e",
  },
  contentContainer: {
    height: "100%",
    overflowY: "scroll",
    flex: 1,
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    width: "100%",
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
    // backgroundColor: "rgba(151, 151, 151, 0.25)",
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
