import { Checker } from "@/components/common/checker";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { HelperText, Text, TextInput, useTheme, Button } from "react-native-paper";
import { testFoodTypes } from "@/assets/test_data";
import { useEffect, useRef, useState } from "react";
import { useLocalUserInfo, useUser } from "@/store/user_store";
import { useRouter, useSegments } from "expo-router";
import { addUser } from "@/firebase/firestore";

export default function AboutYou () {
    const theme = useTheme();
    const user = useUser((state: any) => state.user);
    const displayNameInput = useRef<any>(null);
    const router = useRouter();
    const [userName, setUsername] = useState("");
    const [displayNameHelperText, setDisplayNameHelperText] = useState(false);
    const segments = useSegments();

    const redirectUser = () => {
        if (userName.replace(/\s/g, "") !== "") {
            addUser(user, userName);
        } else {
            setDisplayNameHelperText(true); // Display name field must be filled
            return;
        };

        router.replace('./home');
    };

    useEffect(() => {
        if (segments[segments.length - 1] === "about_you") {
            const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
                displayNameInput.current?.blur(); // Blurring text inputs when keyboard is pressed out
            });
        
            return () => keyboardListener.remove();
        };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text variant="displaySmall" style={[styles.title, { color: theme.colors.tertiary }]}>Now a little about yourself...</Text>
                <HelperText type="info" style={styles.helperText}>Display Name</HelperText>
                {
                    displayNameHelperText ? <HelperText type="info" style={{ 
                        color: theme.colors.tertiary, 
                        fontFamily: 'Montserrat',
                        fontSize: 15,
                        paddingLeft: '-2%',
                    }}>You must choose a name!</HelperText> : null
                }
                <TextInput
                ref={displayNameInput}
                mode="outlined"
                style={styles.textInput}
                outlineColor={theme.colors.surfaceDisabled}
                textColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.tertiary}
                onChangeText={(text) => {
                    setUsername(text);
                    setDisplayNameHelperText(false);
                }}
                />
                <HelperText type="info" style={styles.helperText}>What's your appetite?</HelperText>
                <Checker options={testFoodTypes}/>
                <Button
                buttonColor={theme.colors.tertiary}
                style={styles.continueButton}
                labelStyle={styles.continueButtonLabel}
                onPress={redirectUser}
                >Get Eating!</Button>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingVertical: '20%',
        paddingHorizontal: '5%',
    },
    title: {
        fontFamily: 'Montserrat',
    },
    textInput: {
        fontFamily: 'Montserrat',
        height: 50,
        borderRadius: 5,
    },
    helperText: {
        fontFamily: 'Montserrat',
        fontSize: 15,
        marginTop: '10%',
        paddingLeft: '-2%',
    },
    continueButtonLabel: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    continueButton: {
        borderRadius: 5,
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});