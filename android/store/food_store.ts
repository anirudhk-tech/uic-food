import { create } from "zustand";

export const useFood = create((set) => ({
        foodType: [],
        distanceMax: 10.0,
        priceMax: 100.00,
        deliveryOnly: false,
        veggieOnly: false,
        setFoodType: (value: Array<string>) => set({ foodType: value }),
        setDistanceMax: (value: number) => set({ distanceMax: value }),
        setPriceMax: (value: number) => set({ priceMax: value }),
        setDeliveryOnly: (value: boolean) => set({ deliveryOnly: value }),
        setVeggieOnly: (value: boolean) => set({ veggieOnly: value }),
    }),
);