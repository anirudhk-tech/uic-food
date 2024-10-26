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
    firstTime: boolean;
    setFirstTime: (value: boolean) => void;
}

export const useLocalUserInfo = create<LocalUserState>(
    (set) => ({
        customDisplayName: "",
        setCustomDisplayName: (value: string) => set({ customDisplayName: value }),
        firstTime: true,
        setFirstTime: (value: boolean) => set({ firstTime: value }),
    }),
);