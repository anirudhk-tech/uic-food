import { useRouter } from "expo-router";
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from "react";
import { initFirebase } from "../../firebaseConfig.js";

export default function Index() {
  const router = useRouter();

  useEffect(() => { // Initializes firebase connection
    initFirebase();
  }, []);

  setTimeout(() => {
    router.push('./create_auth');
  }, 1000);
};