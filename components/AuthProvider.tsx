import { PropsWithChildren, createContext, useEffect } from "react";
import { TStatus, signOut, useAuth } from "../_store/useAuthStore";
import { useSegments } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";
import { Pressable, Text } from "react-native";

const AuthContext = createContext<TStatus>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation();
  const segments = useSegments()[0];
  const { status, token } = useAuth();

  useEffect(() => {
    console.log({ token });

    if (status !== "signIn") {
      console.log("true");
      navigation?.navigate("Signin" as never);
      return;
    }
  }, [status, segments]);

  return (
    <AuthContext.Provider value={status}>
      <Pressable onPress={signOut} className="p-10">
        <Text> logout</Text>
      </Pressable>

      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
