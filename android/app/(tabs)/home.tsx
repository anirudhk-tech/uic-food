import { AppBar } from "@/components/common/appbar";
import { useUser } from "@/store/user_store";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import { Filter } from "@/components/home/filter";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchUser } from "@/firebase/firestore";

export default function Home () {
    const theme = useTheme();
    const user = useUser((state: any) => state.user);
    const setUser = useUser((state: any) => state.setUser);
    const router = useRouter();

    useEffect(() => {
        const resetUser = async () => { // Replacing auth object with stored user data
            await fetchUser(user.email).then(data => {
                setUser(data);
                console.log("User object has been replaced: ", data);
            });
        };
        resetUser();
    }, []);

    return (
        <View style={styles.container}>
            <AppBar/>
            <View style={styles.subContainer}>
                <View style={styles.userInfoContainer}>
                    <View style={{ width: '80%' }}>
                        <Text style={[styles.userGreetingText, { fontSize: 20 }]}>Hello {user?.display_name ? user.display_name : ""}</Text>
                        <Text style={[styles.userGreetingText, { fontSize: 30, marginTop: '5%', color: theme.colors.tertiary }]}>Hungry?</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.navigate(`../profile/${user.email}`)}>
                    {user?.profile_photo_url ?
                        <Avatar.Image 
                        size={50} 
                        source={{ uri: user.profile_photo_url }} 
                        /> :
                        <Avatar.Image 
                        size={50} 
                        source={require('../../assets/images/no_profile.jpg')} 
                        />
                    }
                    </TouchableOpacity>
                </View>
                <Filter/>
                <Button 
                mode="contained" 
                style={[styles.button, { backgroundColor: theme.colors.tertiary }]}
                labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}>Let's Eat</Button>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    subContainer: {
        height: '90%',
        padding: '3%',
    },
    userProfile: {
        marginLeft: 'auto',
    },
    userInfoContainer: {
        flexDirection: 'row',
        padding: '5%',
        gap: 30,
    },
    userGreetingText: {
        fontFamily: 'Montserrat',
        flexWrap: 'wrap',
    },
    optionSurface: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1%',
    },
    optionText: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    buttonLabel: {
        fontFamily: 'Montserrat',
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
    },
    button: {
        borderRadius: 5,
        width: '60%', 
        height: '7%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: '2%',
    },
});