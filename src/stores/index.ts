import { getLocalStorage } from "@/utils/localStorage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  user: Record<string, any>;
  token: string;
  setUser: (token: State["user"]) => void;
  reset: () => void;
}

const localStoreUser =
  typeof window !== "undefined" ? getLocalStorage("user", true) ?? {} : {};

const localToken =
  typeof window !== "undefined" ? getLocalStorage("token", true) ?? null : null;  

export const useUserStore = create<State>()(
  devtools(
    (set) => ({
      token: localToken,  
      user: localStoreUser,
      setUser: (user: Record<string, any>) => set(() => ({ user })),
      reset: () => set(() => ({ user: {} })),
    }),
    { enabled: process.env.NODE_ENV != "production", name: "useUserStore" }
  )
);