import { useEffect, useRef, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, HelperText, Text, TextInput, useTheme } from "react-native-paper";
import auth from '@react-native-firebase/auth';
import { googleAuth, emailPasswordLogin } from "../../firebase/auth";
import { useUser } from '../../store/user_store';
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const theme = useTheme();

  const userInputRef = useRef<any>(null); // References to blur text inputs
  const passInputRef = useRef<any>(null);

  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const user = useUser((state: any) => state.user);
  const setUser = useUser((state: any) => state.setUser);
  const router = useRouter();

  const signinWithEmailAndPassword = async () => {
    if (email.replace(' ', '') === "") { // Checking whether inputs are empty
      setEmailError("Please enter a valid email.");
      return;
    } else if (password.replace(' ', '') === "") {
      setPasswordError("Please enter a password.");
      return;
    };

    const res: any = await emailPasswordLogin(email, password);

    if (res === "auth/invalid-credential") { // Responses to user auth errors
      setEmailError("Invalid credentials. Please check your email/password.");
    } else if (res === "auth/invalid-email") {
      setEmailError("Please enter a valid email.");
    };
  }

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      userInputRef.current?.blur(); // Blurring text inputs when keyboard is pressed out
      passInputRef.current?.blur(); 
    });

    return () => keyboardListener.remove();
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => { setUser(user) });
    return subscriber; 
  }, []);

  useEffect(() => {
    if (user != null) {
      // Implement "a little about yourself screen" and index routing FIXME
    }
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text variant="displaySmall" style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
            <View>
              <Text style={styles.prompt}>Email</Text>
              <TextInput 
              ref={userInputRef}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              mode="outlined"
              outlineColor="#D3D3D3"
              activeOutlineColor={theme.colors.tertiary}
              contentStyle={styles.textInput}
              style={styles.textInput}/>
              <HelperText 
              type="error" 
              visible={emailError !== ''} 
              style={[styles.helperText, { color: theme.colors.tertiary }]}>
                {emailError}
              </HelperText>
            </View>
            <View>
              <Text style={styles.prompt}>Password</Text>
              <TextInput 
              ref={passInputRef}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              secureTextEntry={hidePassword} // Making password entry dots
              mode="outlined"
              outlineColor="#D3D3D3" 
              activeOutlineColor={theme.colors.tertiary}
              style={styles.textInput}
              right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(prev => !prev)}/>}
              />
              <HelperText 
              type="error" 
              visible={passwordError !== ''} 
              style={[styles.helperText, { color: theme.colors.tertiary }]}>
                {passwordError}
              </HelperText>
            </View>
        </View>
        <Button 
        buttonColor={theme.colors.tertiary} 
        mode="contained"
        labelStyle={styles.signupButtonLabel}
        style={styles.signupButton}
        onPress={signinWithEmailAndPassword}
        >Log in</Button>
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginPrompt}>Don't have an account?</Text>
          <Text 
          style={[
            styles.loginLink, 
            { color: theme.colors.tertiary, textDecorationColor: theme.colors.tertiary }
          ]}
          onPress={() => router.navigate('./create_auth')}>Create one!</Text>
        </View>
        <Button
        buttonColor={theme.colors.tertiary}
        mode="contained"
        icon="google"
        style={styles.signupButton}
        onPress={googleAuth}
        >Log in with Google</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingVertical: '20%',
    paddingHorizontal: '5%',
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: '15%',
    flexDirection: 'column',
    gap: 30,
  },
  prompt: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '800',
  },
  textInput: {
    fontFamily: 'Montserrat',
    height: 50,
    borderRadius: 5,
  },
  signupButtonLabel: {
    fontFamily: 'Montserrat', 
    fontWeight: 'bold',
  },
  signupButton: {
    borderRadius: 5,
    marginTop: '20%',
    height: '8%',
    justifyContent: 'center',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: '10%',
  },
  loginPrompt: {
    fontFamily: 'Montserrat',
    fontSize: 15,
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: 'Montserrat',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  helperText: {
    fontFamily: 'Montserrat',
    fontSize: 13, 
  },

});