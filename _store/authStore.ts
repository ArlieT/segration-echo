import { create } from "zustand";
import { TCredential, getToken, removeToken, setToken } from "./_utils/auth";

type AuthStore = {
  status: "idle" | "signIn" | "signOut";
  token: TCredential | null;
  signIn: (token: TCredential) => void;
  signOut: () => void;
  hydrate: () => void;
};

const _useAuth = create<AuthStore>((set, get) => ({
  status: "idle",
  token: null,
  signIn: (token: TCredential) => {
    setToken(token);
    set({ status: "signIn", token });
  },
  signOut: () => {
    removeToken();
    set({ status: "signOut", token: null });
  },
  hydrate: async () => {
    try {
      const userToken = await getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      get().signOut();
      // handle error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = _useAuth;

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TCredential) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
