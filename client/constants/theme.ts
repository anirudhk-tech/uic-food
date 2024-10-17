import { ThemeProp } from "react-native-paper/lib/typescript/types";

const tintColor = '#FF0000';

export const lightTheme: ThemeProp = {
  dark: false,
  colors: {
    primary: '#000',
    background: '#fff',
    accent: tintColor,
  }
};

export const darkTheme: ThemeProp = {
  dark: true,
  colors: {
    primary: '#fff',
    background: '#000',
    accent: tintColor,
  }
}
