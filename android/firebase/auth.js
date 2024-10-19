import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const googleAuth = async () => {
    GoogleSignin.configure({
        webClientId: "632152835759-h7knftftv5j9vi1u120bm8flinlg69bq.apps.googleusercontent.com",
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    console.log("User signed in!");
    
    return auth().signInWithCredential(googleCredential);
}