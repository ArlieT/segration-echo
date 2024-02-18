import { PropsWithChildren, createContext, useEffect } from "react";
import { TStatus, useAuth } from "../_store/authStore";
import { useRouter, useSegments } from "expo-router";

const AuthContext = createContext<TStatus>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const segments = useSegments()[0];
  const { status, token } = useAuth();
  //   const status = "signOut";
  useEffect(() => {
    console.log({ segments });
    console.log({ token });
    console.log({ status });
    if (status === "signIn") return;
    if (status === "idle") {
      console.log("true");
      router.replace("/(auth)/signin");
      return;
    }
    if (status === "signOut" && segments === "(app)") {
      console.log("should sign in");
      router.replace("/(auth)/signin");
    } else {
      router.replace("/");
    }
  }, [status, segments]);

  const ROLE = "ADMIN";
  useEffect(() => {
    if (ROLE === "ADMIN") {
      router.replace("/(app)/(tabs)");
    } else {
      router.replace("/(app)/(student)");
    }
  }, [status]);

  return <AuthContext.Provider value={status}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
