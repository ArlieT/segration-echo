import { PropsWithChildren, createContext, useEffect } from "react";
import { TStatus, useAuth } from "../_store/useAuthStore";
import { useSegments } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";

const AuthContext = createContext<TStatus>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation();
  const segments = useSegments()[0];
  const { status, token } = useAuth();

  useEffect(() => {
    console.log({ token });
    if (status !== "signIn") {
      navigation?.navigate("Signin" as never);
      return;
    }
  }, [status, segments]);

  return <AuthContext.Provider value={status}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
