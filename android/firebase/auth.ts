import { GoogleSignin, SignInResponse } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const googleAuth = async () => {
    GoogleSignin.configure({
        webClientId: "632152835759-h7knftftv5j9vi1u120bm8flinlg69bq.apps.googleusercontent.com",
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const user: SignInResponse = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.data?.idToken!);
    const userSignOn = auth().signInWithCredential(googleCredential);

    console.log("User logged in with Google: ", user);

    return userSignOn;
};

export const googleLogout = async () => {
    GoogleSignin.configure({
        webClientId: "632152835759-h7knftftv5j9vi1u120bm8flinlg69bq.apps.googleusercontent.com",
    });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    auth().signOut();
    console.log("User signed out.");
};

export const emailPasswordAuth = async (email: string, password: string) => {
    try {
        const user: FirebaseAuthTypes.UserCredential = await auth().createUserWithEmailAndPassword(email, password);
        console.log("User logged in with email and password: ", user);
        return user;
    } catch (error: any) {
        console.log("Error logging in: ", error.code);
        return error.code;
    }
};

export const emailPasswordLogin = async (email: string, password: string) => {
    try {
        const user: FirebaseAuthTypes.UserCredential = await auth().signInWithEmailAndPassword(email, password);
        console.log("User logged in with existing account email and password: ", user);
        return user;
    } catch (error: any) {
        console.log("Error loggin into existing account: ", error.code);
        return error.code;
    };
};