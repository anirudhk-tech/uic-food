import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    user: any;
    customDisplayName: string;
    setUser: (value: any) => void;
    clearUser: () => Promise<void>;
    changeCustomDisplayName: (newName: string) => void;
    firstTime: boolean;
    setFirstTime: (value: boolean) => void;
}

export const useUser = create<UserState>(
        (set, get) => ({
            user: null,
            customDisplayName: "",
            setUser: (value: any) => set({ user: value }),
            clearUser: async () => {
                set({ user: null });
            },
            changeCustomDisplayName: (newName: string) => set({ customDisplayName: newName}),
            firstTime: true,
            setFirstTime: (value: boolean) => set({ firstTime: value }),
        }),
);