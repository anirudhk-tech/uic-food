import { useRouter } from "expo-router";
import { useEffect } from "react";
import { initFirebase } from "../../firebaseConfig.js";
import { useLocalUserInfo } from "@/store/user_store";

export default function Index() {
  const router = useRouter();
  const firstTime = useLocalUserInfo((state: any) => state.firstTime);

  useEffect(() => { // Initializes firebase connection
    initFirebase();
  }, []);

  setTimeout(() => {
    if (!firstTime) {
      router.push('./home');
    } else {
      router.push('./login_auth'); 
    }
  }, 1000);
};