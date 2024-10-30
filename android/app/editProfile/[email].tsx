import { SecondaryAppBar } from "@/components/common/secondaryAppbar";
import { editUsername } from "@/firebase/firestore";
import { useLocalUserInfo, useUser } from "@/store/user_store";
import { useLocalSearchParams } from "expo-router"
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

export default function EditProfile () {
    const user = useUser((state: any) => state.user);
    const setUser = useUser((state: any) => state.setUser);
    const [newName, setNewName] = useState(user.display_name);
    const theme = useTheme();
    const inputRef = useRef<any>(null);

    useEffect(() => {
        const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
          inputRef.current.blur();
        });
    
        return () => keyboardListener.remove();
      });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <SecondaryAppBar title={"Edit Profile"} backAction={() => {
                    editUsername(user.email, newName);
                    setUser({...user, display_name: newName});
                }}/>
                <View style={styles.profileDetailsContainer}>
                        <View style={styles.profileDetailBar}>
                            <Text style={styles.profileDetailBarText}>Name |  </Text>
                            <TextInput 
                            ref={inputRef}
                            style={styles.profileDetailBarTextInput}
                            value={newName}
                            onChangeText={setNewName}
                            mode='flat'
                            underlineColor={theme.colors.primary}
                            activeUnderlineColor={theme.colors.tertiary}/>
                        </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    profileDetailsContainer: {
        height: '90%',
        width: '100%',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
    },
    profileDetailBar: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileDetailBarTextInput: {
        flex: 3,
        fontFamily: 'Montserrat',
        fontSize: 20,
    },
    profilePlaceholderText: {
        fontFamily: 'Montserrat',
        fontSize: 20,
    },
    profileDetailBarText: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        flex: 1,
    },
});