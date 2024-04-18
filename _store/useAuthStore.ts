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

const useAuth = create<AuthStore>((set, get) => {
  return {
    status: "idle",
    token: null,
    role: "",

    signIn: async (token: TCredential) => {
      await setToken(token);
      set({ status: "signIn", token, ...token });
    },
    signOut: () => {
      set({ status: "signOut", token: null });
      removeToken();
    },
    hydrate: async () => {
      try {
        const userToken = await getToken();
<<<<<<< HEAD
=======
        console.log({ userToken });
>>>>>>> 4879d91648271d80fa144d107474b9f399dae021
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
  };
});

export { useAuth };

export const signOut = () => useAuth.getState().signOut();
export const signIn = (token: TCredential) => useAuth.getState().signIn(token);
export const hydrateAuth = () => useAuth.getState().hydrate();
