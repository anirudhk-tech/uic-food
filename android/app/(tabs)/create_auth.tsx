import { useEffect, useRef, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, HelperText, Text, TextInput, useTheme, ActivityIndicator } from "react-native-paper";
import auth from '@react-native-firebase/auth';
import { googleAuth, emailPasswordAuth } from "../../firebase/auth";
import { useUser } from '../../store/user_store';
import { useRouter, useSegments } from "expo-router";

export default function SignUpScreen() {
  const theme = useTheme();

  const userInputRef = useRef<any>(null); // References to blur text inputs
  const passInputRef = useRef<any>(null);

  const [activityBuffer, setActivityBuffer] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const setUser = useUser((state: any) => state.setUser);
  const router = useRouter();
  const segments = useSegments();

  const signupWithEmailAndPassword = async () => {
    if (email.replace(' ', '') == "" || password.replace(' ', '') == "") { // Checking whether inputs are empty
      setPasswordError("Please enter a password.");
      setEmailError("Please enter a valid email.");
      return;
    }

    const res: any = await emailPasswordAuth(email, password);

    if (res === "auth/email-already-in-use") { // Responses to error regarding authentication on the user end
      setEmailError("Email already in use!");
    } else if (res === "auth/weak-password") {
      setPasswordError("Password too weak!");
    } else if (res === "auth/invalid-email") {
      setEmailError("Invalid email!")
    } else {}
  }

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      userInputRef.current?.blur(); // Blurring text inputs when keyboard is pressed out
      passInputRef.current?.blur(); 
    });

    return () => keyboardListener.remove();
  });

  useEffect(() => {
    if (segments[segments.length - 1] === "create_auth") {
      const subscriber = auth().onAuthStateChanged((user) => { 
        setUser(user);
        if (user) { // Avoiding initial connection
          setActivityBuffer(true);
          console.log("User's first time: ", user);
          setTimeout(() => {
            router.replace('./about_you'), 1000;
            setActivityBuffer(false);
          });
        };
      });
      return subscriber; 
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        { activityBuffer ? 
          <ActivityIndicator animating={true} color={theme.colors.tertiary}/> : null
        }
        <Text variant="displaySmall" style={styles.title}>Create account</Text>
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
              outlineColor={theme.colors.surfaceDisabled}
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
        onPress={signupWithEmailAndPassword}
        >Sign up</Button>
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginPrompt}>Already have an account?</Text>
          <Text 
          style={[
            styles.loginLink, 
            { color: theme.colors.tertiary, textDecorationColor: theme.colors.tertiary }
          ]}
          onPress={() => router.replace('./login_auth')}>Log in</Text>
        </View>
        <Button
        buttonColor={theme.colors.tertiary}
        mode="contained"
        icon="google"
        style={styles.signupButton}
        onPress={googleAuth}
        >Sign up with Google</Button>
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