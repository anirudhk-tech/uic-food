import { AppBar } from "@/components/common/appbar"
import { View, StyleSheet } from "react-native"
import { Avatar, Button, Text, useTheme } from "react-native-paper"
import { useUser } from "@/store/user_store";
import { useRouter } from "expo-router";
import { SecondaryAppBar } from "@/components/common/secondaryAppbar";

export default function Profile () {
    const user = useUser((state: any) => state.user);
    const theme = useTheme();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <SecondaryAppBar title={"Profile"}/>
            <View style={styles.subContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    <Avatar.Image 
                    size={125} 
                    source={{ uri: user.photoURL }} 
                    />
                    <Text style={styles.name}>{user.customDisplayName ? user.customDisplayName : user.displayName}</Text>
                    <Text style={[styles.email, { color: 'gray' }]}>{user.email}</Text>
                    <Button 
                    buttonColor={theme.colors.tertiary} 
                    textColor={theme.colors.primary}
                    labelStyle={{ fontFamily: 'Montserrat' }}
                    style={{ marginTop: '5%' }}
                    onPress={() => router.push(`../editProfile/${user.email}`)}
                    >Edit Profile</Button>
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