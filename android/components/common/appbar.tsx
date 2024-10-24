import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

export const AppBar: React.FC = () => {
    const theme = useTheme();

    return (
       <Appbar.Header style={{ backgroundColor: theme.colors.tertiary }}>
            <Appbar.Content title="Chicago Eats" titleStyle={[styles.titleStyle, { color: theme.colors.primary }]}/>
       </Appbar.Header> 
    )
};

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: 'Montserrat',
    },
})