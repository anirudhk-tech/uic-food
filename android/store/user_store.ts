import { create } from "zustand";

export const useUser = create((set) => ({
    user: null,
    setUser: (value: any) => set({ user: value }),
    clearUser: () => set({ user: null }),
}));