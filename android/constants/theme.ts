import { ThemeProp } from "react-native-paper/lib/typescript/types";

const tintColor = '#FF0000';
const lightColor = '#F5F5F5';
const darkColor = '#000';

export const lightTheme: ThemeProp = {
  dark: false,
  colors: {
    primary: lightColor,
    secondary: darkColor,
    background: lightColor,
    tertiary: tintColor,
  }
};

export const darkTheme: ThemeProp = {
  dark: true,
  colors: {
    primary: darkColor,
    secondary: lightColor,
    background: darkColor,
    tertiary: tintColor,
  }
};