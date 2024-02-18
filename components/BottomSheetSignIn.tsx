import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../_store/authStore";
import SignIn from "./bottom-sheet/SignIn";
import SignUp from "./bottom-sheet/Signup";
import { StatusBar } from "expo-status-bar";

export default function BottomSheetSignIn() {
  const { status, token, signOut, signIn } = useAuth();
  const [bottomSheet, setBottomSheet] = useState("signin");

  const handleBottomSheet = (bottomSheet: string) => {
    console.log(bottomSheet);
    setBottomSheet(bottomSheet);
  };

  //dont render if user is signed in
  if (status === "signIn") {
    return null;
  }

  return (
    <>
      <StatusBar style={status === "signOut" ? "dark" : "light"} />
      {true ? (
        bottomSheet === "signin" ? (
          <SignIn handleBottomSheet={handleBottomSheet} />
        ) : bottomSheet === "signup" ? (
          <SignUp handleBottomSheet={handleBottomSheet} />
        ) : null
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({});
