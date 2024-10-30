import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    user: any;
    setUser: (value: any) => void;
}

export const useUser = create<UserState>(
        (set) => ({
            user: null,
            setUser: (value: any) => set({ user: value }),
        }),
);


interface LocalUserState {
    customDisplayName: string;
    setCustomDisplayName: (value: string) => void;
}

export const useLocalUserInfo = create<LocalUserState>(
    (set) => ({
        customDisplayName: "",
        setCustomDisplayName: (value) => set({ customDisplayName: value }),
    }),
);