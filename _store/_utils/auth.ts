import AsyncStorage from "@react-native-async-storage/async-storage";
import { TBin } from "../../app/(app)/(tabs)";

export type TCredential = {
  username: string;
  password: string;
  role?: "STUDENT" | "ADMIN" | "";
  bin_score: TBin | undefined;
  bin_count: TBin | undefined;
};
const setToken = async (credential: TCredential) => {
  await AsyncStorage.setItem("user", JSON.stringify(credential));
};

const getToken = async (): Promise<TCredential | null> => {
  const userData = await AsyncStorage.getItem("user");
  const user = userData !== null ? JSON.parse(userData) : null;
  return user;
};

const removeToken = async () => {
  await AsyncStorage.removeItem("user");
};

export { setToken, getToken, removeToken };
