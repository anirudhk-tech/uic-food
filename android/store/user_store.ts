import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUser = create(
        (set) => ({
            user: null,
            setUser: (value: any) => set({ user: value }),
            clearUser: async () => {
                set({ user: null });
            },
            firstTime: true,
            setFirstTime: (value: boolean) => set({ firstTime: value }),
        }),
);