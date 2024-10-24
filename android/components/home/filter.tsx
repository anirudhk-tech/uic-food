import React, { useState } from 'react';
import { useFood } from '@/store/food_store';
import { View, StyleSheet } from 'react-native';
import { testDistanceTypes, testFoodTypes, testPriceTypes } from '@/assets/test_data';
import { Chip, SegmentedButtons, Surface, Text, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';

export const Filter: React.FC = () => {
    const foodType = useFood((state: any) => state.foodType);
    const setFoodType = useFood((state: any) => state.setFoodType);
    const priceMax = useFood((state: any) => state.priceMax);
    const setPriceMax = useFood((state: any) => state.setPriceMax);
    const distanceMax = useFood((state: any) => state.distanceMax);
    const setDistanceMax = useFood((state: any) => state.setDistanceMax);
    const deliveryOnly = useFood((state: any) => state.deliveryOnly);
    const setDeliveryOnly = useFood((state: any) => state.setDeliveryOnly);
    const veggieOnly = useFood((state: any) => state.veggieOnly);
    const setVeggieOnly = useFood((state: any) => state.setVeggieOnly);

    const theme = useTheme();

    const setDelivery = ( value: string ) => {
        if (value === "delivery") {
            setDeliveryOnly(true);
        } else {
            setDeliveryOnly(false);
        };
    };

    const setVeggie = ( value: string ) => {
        if (value === "veggie") {
            setVeggieOnly(true);
        } else {
            setVeggieOnly(false);
        };
    };

    
    return (
        <View style={styles.container}>
            <SegmentedButtons
            value={deliveryOnly ? "delivery" : "eatin"}
            onValueChange={setDelivery}
            buttons={[
                {
                    value: "delivery",
                    label: "Delivery",
                    icon: "moped",
                    uncheckedColor: theme.colors.tertiary,
                    checkedColor: theme.colors.primary,
                    style: { backgroundColor: deliveryOnly ? theme.colors.tertiary : theme.colors.primary },
                },
                {
                    value: "eatin",
                    label: "Eat In",
                    icon: "food-fork-drink",
                    uncheckedColor: theme.colors.tertiary,
                    checkedColor: theme.colors.primary,
                    style: { backgroundColor: deliveryOnly ? theme.colors.primary : theme.colors.tertiary }
                }
            ]}
            />
            <SegmentedButtons
            value={veggieOnly ? "veggie" : "nonVeggie"}
            onValueChange={setVeggie}
            buttons={[
                {
                    value: "veggie",
                    label: "Vegetarian",
                    icon: "food-apple",
                    uncheckedColor: theme.colors.tertiary,
                    checkedColor: theme.colors.primary,
                    style: { backgroundColor: veggieOnly ? theme.colors.tertiary : theme.colors.primary },
                },
                {
                    value: "nonVeggie",
                    label: "Non-Vegetarian",
                    icon: "hamburger",
                    uncheckedColor: theme.colors.tertiary,
                    checkedColor: theme.colors.primary,
                    style: { backgroundColor: veggieOnly ? theme.colors.primary : theme.colors.tertiary }
                }
            ]}
            />
            <View style={styles.sliderContainer}>
                <View style={styles.sliderAndTextContainer}>
                    <Text style={styles.sliderTopText}>Max Price</Text>
                    <Slider 
                    style={styles.slider}
                    onValueChange={setPriceMax}
                    minimumTrackTintColor={theme.colors.tertiary}
                    maximumTrackTintColor={theme.colors.secondary}
                    thumbTintColor={theme.colors.tertiary}
                    minimumValue={testPriceTypes[0]}
                    maximumValue={testPriceTypes[testPriceTypes.length - 1]}
                    tapToSeek={true}
                    step={5}
                    value={priceMax}
                    />
                </View>
                <Surface style={[styles.sliderLabelSurface, { backgroundColor: theme.colors.tertiary }]}>
                    <Text style={styles.sliderLabelText}>${priceMax}</Text>
                </Surface>
            </View>
            <View style={styles.sliderContainer}>
                <View style={styles.sliderAndTextContainer}>
                    <Text style={styles.sliderTopText}>Max Distance</Text>
                    <Slider 
                    style={styles.slider}
                    onValueChange={setDistanceMax}
                    minimumTrackTintColor={theme.colors.tertiary}
                    maximumTrackTintColor={theme.colors.secondary}
                    thumbTintColor={theme.colors.tertiary}
                    minimumValue={testDistanceTypes[0]}
                    maximumValue={testDistanceTypes[testDistanceTypes.length - 1]}
                    tapToSeek={true}
                    step={0.5}
                    value={distanceMax}
                    />
                </View>
                <Surface style={[styles.sliderLabelSurface, { backgroundColor: theme.colors.tertiary }]}>
                    <Text style={styles.sliderLabelText}>{distanceMax} mi</Text>
                </Surface>
            </View>
            <View style={styles.foodTypesContainer}>
                {
                    testFoodTypes.map((food, idx) => (
                        <Chip
                        key={idx}
                        style={{
                            borderColor: theme.colors.tertiary,
                            borderWidth: 1,
                            backgroundColor: foodType.includes(food) ? theme.colors.tertiary : theme.colors.primary,
                        }}
                        selected={foodType.includes(food)}
                        selectedColor={foodType.includes(food) ? theme.colors.primary : theme.colors.tertiary}
                        showSelectedCheck={true}
                        onPress={() => foodType.includes(food) ? setFoodType(foodType.filter((x: string) => x != food)) : setFoodType([...foodType, food])}
                        >{food}</Chip>
                    ))
                }
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: '5%',
        height: '70%',
        gap: 30
    },
    sliderContainer: {
        flexDirection: 'row',
        gap: 30,
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2%',
    },
    sliderAndTextContainer: {
        width: '70%', 
        gap: 10
    },
    sliderTopText: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        marginLeft: '5%',
    },
    slider: {
        width: '100%',
        height: '5%',
    },
    sliderLabelSurface: {
        height: 65,
        aspectRatio: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderLabelText: {
        fontFamily: 'Montserrat',
        fontSize: 20,
    },
    foodTypesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        marginLeft: '5%',
    },
});