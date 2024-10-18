import { Dimensions, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
       <Text variant="displayLarge">UIC Eats</Text> 
    </View>
  );
};


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },

  uicTitle: {
    fontFamily: 'Montserrat',
  }
});