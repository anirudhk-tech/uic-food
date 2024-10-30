import { useRouter } from "expo-router";
import { useEffect } from "react";
import { initFirebase } from "../../firebaseConfig.js";

export default function Index() {
  const router = useRouter();

  useEffect(() => { // Initializes firebase connection
    initFirebase();
  }, []);

  setTimeout(() => { // TO-DO access firebase and check if it is user's first time
    router.push('./login_auth'); 
  }, 1000);
};