import { create } from "zustand";
import { TCredential, getToken, removeToken, setToken } from "./_utils/auth";

export type TStatus = "idle" | "signIn" | "signOut" | null;
type AuthStore = {
  status: TStatus;
  role: "STUDENT" | "ADMIN" | "";
  token: TCredential | null;
  signIn: (token: TCredential) => void;
  signOut: () => void;
  hydrate: () => void;
};

const _useAuth = create<AuthStore>((set, get) => ({
  status: "idle",
  token: null,
  role: "",
  signIn: async (token: TCredential) => {
    await setToken(token);
    // console.log("token set!");
    set({ status: "signIn", token });
  },
  signOut: () => {
    set({ status: "signOut", token: null });
    removeToken();
  },
  hydrate: async () => {
    try {
      const userToken = await getToken();
      console.log({ userToken });
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // handle error here
      get().signOut();
    }
  },
}));

export const useAuth = _useAuth;

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TCredential) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
