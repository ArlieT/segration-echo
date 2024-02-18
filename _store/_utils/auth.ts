import AsyncStorage from "@react-native-async-storage/async-storage";

export type TCredential = {
  username: string;
  password: string;
  role?: "STUDENT" | "ADMIN" | "";
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
