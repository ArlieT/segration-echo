import { PropsWithChildren, createContext, useEffect } from "react";
import { TStatus, useAuth } from "../_store/useAuthStore";
import { useSegments } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";

const AuthContext = createContext<TStatus>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation();
  const segments = useSegments()[0];
  const { status, token, hydrate } = useAuth();

  useEffect(() => {
    if (status === "signOut" || !token) {
      console.log("should navigate to signin");
      navigation?.navigate("Signin" as never);
    }
    if (token?.role === "ADMIN") {
      navigation?.navigate("Admin" as never);
    } else if (token?.role === "STUDENT") {
      navigation?.navigate("Student" as never);
    }
  }, [status, segments]);

  useEffect(() => {
    hydrate();
  }, []);

  return <AuthContext.Provider value={status}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
