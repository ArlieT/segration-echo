import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetTextInput,
  TouchableHighlight,
} from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../_store/useAuthStore";
import { TCredential } from "../../_store/_utils/auth";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { StatusBar } from "expo-status-bar";

const SignUp = ({
  handleBottomSheet,
}: {
  handleBottomSheet: (bottomSheet: string) => void;
}) => {
  const { status, token, signOut, signIn } = useAuth();
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [credential, setCredential] = useState<TCredential>({
    username: "",
    password: "",
    role: "",
  });

  const snapPoints = useMemo(() => ["100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleSubmit = async () => {
    const { username, password, role } = credential;
    if (username.length < 4) {
      setError("Username must be at least 4 characters long");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    if (credential) {
      setTimeout(() => {
        //signIn();//SIGNUP
        setCredential({
          username: "",
          password: "",
          role: "",
        });
        handleBottomSheet("signin");
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
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      containerStyle={{
        zIndex: 9999,
      }}
      containerHeight={{ value: 1000 }}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      backgroundStyle={{ backgroundColor: "#051c2e" }}
    >
      <StatusBar style={"light"} />
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Sign up</Text>
        <View className="w-full justify-center items-center p-4">
          <Text className="text-white text-lg text-left w-full">Username</Text>
          <BottomSheetTextInput
            value={credential.username}
            onChange={(e) =>
              setCredential({ ...credential, username: e.nativeEvent.text })
            }
            style={styles.input}
            className="w-full"
          />
          <Text className="text-white text-lg text-left w-full">Password</Text>
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
                role: selectedItem.toString().toLowerCase(),
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
          <Text style={styles.error}>{error}</Text>
          <TouchableHighlight onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
          <View className=" flex-row my-6 justify-center items-center flex">
            <Text className="text-white">Already have an account?</Text>
            <Pressable onPress={() => handleBottomSheet("signin")}>
              <Text className="text-blue-500">&nbsp; Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    height: "100%",
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
export default SignUp;
