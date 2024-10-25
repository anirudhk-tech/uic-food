import React from "react"
import { Appbar, useTheme } from "react-native-paper"
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface SecondaryAppBarProps {
    title: any;
    backAction?: any;
};

export const SecondaryAppBar: React.FC<SecondaryAppBarProps> = ({ title, backAction }) => {
    const theme = useTheme();
    const router = useRouter();

    const back = () => {
        if (backAction) {
            backAction();
            router.dismiss();
        } else {
            router.dismiss();
        };
    };

    return (
        <Appbar.Header style={{ backgroundColor: theme.colors.tertiary, justifyContent: 'center' }}>
            <Appbar.BackAction onPress={back} color={ theme.colors.primary }/>
            <Appbar.Content title={title} titleStyle={[styles.titleStyle, { color: theme.colors.primary }]}/>
        </Appbar.Header> 
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: 'Montserrat',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '85%',
    },
})