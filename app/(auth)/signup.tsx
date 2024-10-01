import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TCredential } from "../../_store/_utils/auth";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import SelectDropdown from "react-native-select-dropdown";
import { TouchableHighlight } from "react-native-gesture-handler";
import firebaseRef from "../../firebase/ref";
import { set } from "firebase/database";
import { useNavigation } from "expo-router";

const Signup = ({ navigation }: any) => {
  const { navigate } = useNavigation();
  const [error, setError] = useState({
    message: "",
    status: "error",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [credential, setCredential] = useState<TCredential>({
    username: "",
    password: "",
    role: "",
  } as any);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const { username, password, role } = credential;

    if (password.length < 4) {
      setError({
        message: "Password must be at least 4 characters long",
        status: "error",
      });
      return;
    }

    if (!role) {
      setError({
        message: "Select role",
        status: "error",
      });
      setIsSubmitting(false);
      return;
    }

    if (credential) {
      setIsSubmitting(true);
      setTimeout(async () => {
        await set(firebaseRef(`users/${role}/${username}`), {
          username,
          password,
          role,
        });
        setError({
          message: "User created successfully",
          status: "success",
        });
        setIsSubmitting(false);
      }, 2000);
    } else {
      setError({
        message: "Invalid username or password",
        status: "error",
      });
    }
  };

  useEffect(() => {
    //RESET CREDENTIAL
    return () => {
      setIsSubmitting(false);
      setCredential({
        username: "",
        password: "",
      } as any);
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      // Handle custom back button behavior here
      // For example, prevent going back to the previous screen:
      // navigation.navigate('Home'); // Navigate to a specific screen
      navigate("Signup" as never);
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container} className="border">
      <StatusBar style={"light"} />
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Sign up</Text>
        <View className="w-full justify-center items-center p-4">
          <Text className="text-white text-lg text-left w-full">Username</Text>
          <TextInput
            value={credential.username}
            onChangeText={(e) => setCredential({ ...credential, username: e })}
            style={styles.input}
            className="w-full"
          />
          <Text className="text-white text-lg text-left w-full">Password</Text>
          <View className="block justify-center items-center relative  w-full">
            <TextInput
              className="bg-[#19232c] "
              secureTextEntry={isShowPassword}
              value={credential.password}
              onChangeText={(e) =>
                setCredential({ ...credential, password: e })
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
          <Text className="text-white text-lg text-left w-full">Role</Text>
          <SelectDropdown
            defaultButtonText="Select Role"
            data={["Admin", "Student"]}
            buttonStyle={{
              borderRadius: 10,
              width: "100%",
              backgroundColor: "rgba(151, 151, 151, 0.25)",
            }}
            renderDropdownIcon={() => (
              <FontAwesome name="chevron-down" color="#fff" size={16} />
            )}
            buttonTextStyle={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "500",
            }}
            dropdownStyle={{
              borderRadius: 10,
            }}
            onSelect={(selectedItem, index) => {
              setCredential({
                ...credential,
                role: selectedItem.toString().toUpperCase(),
              });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
          <Text
            className="mt-4"
            style={error.status === "success" ? styles.success : styles.error}
          >
            {error.message}
          </Text>
          <TouchableHighlight onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>
              {isSubmitting ? "Submitting..." : "Sign up"}
            </Text>
          </TouchableHighlight>
          <View className=" flex-row my-6 justify-center items-center flex">
            <Text className="text-white">Already have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Signin");
              }}
            >
              <Text className="text-blue-500">&nbsp; Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* <BottomSheetSignIn /> */}
    </View>
  );
};

export default Signup;
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
  success: {
    color: "green",
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
