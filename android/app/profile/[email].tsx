import { AppBar } from "@/components/common/appbar"
import { View, StyleSheet } from "react-native"
import { Avatar, Button, Text, useTheme } from "react-native-paper"
import { useLocalUserInfo, useUser } from "@/store/user_store";
import { useRouter } from "expo-router";
import { SecondaryAppBar } from "@/components/common/secondaryAppbar";
import { googleLogout } from "@/firebase/auth";

export default function Profile () {
    const user = useUser((state: any) => state.user);
    const theme = useTheme();
    const router = useRouter();

    const signOut = () => {
        googleLogout();
        router.dismissAll();
        router.replace('/(tabs)/login_auth');
    };

    return (
        <View style={styles.container}>
            <SecondaryAppBar title={"Profile"}/>
            <View style={styles.subContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    {user?.profile_photo_url ?
                        <Avatar.Image 
                        size={125} 
                        source={{ uri: user.profile_photo_url }} 
                        /> :
                        <Avatar.Image 
                        size={125} 
                        source={require('../../assets/images/no_profile.jpg')} 
                        />
                    }
                    <Text style={styles.name}>{user?.display_name ? user.display_name : null}</Text>
                    <Text style={[styles.email, { color: 'gray' }]}>{user.email}</Text>
                    <Button 
                    buttonColor={theme.colors.tertiary} 
                    textColor={theme.colors.primary}
                    labelStyle={{ fontFamily: 'Montserrat' }}
                    style={{ marginTop: '5%' }}
                    onPress={() => router.push(`../editProfile/${user.email}`)}
                    >Edit Profile</Button>
                    <Button 
                    buttonColor={theme.colors.tertiary} 
                    textColor={theme.colors.primary}
                    labelStyle={{ fontFamily: 'Montserrat' }}
                    style={{ marginTop: '5%' }}
                    onPress={signOut}
                    >Logout</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    subContainer: {
        height: '90%',
        padding: '5%',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'Montserrat',
        fontSize: 30,
    },
    email: {
        fontFamily: 'Montserrat',
        fontSize: 13,
    }
})