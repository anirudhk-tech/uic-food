import { useRouter } from "expo-router";
import { useEffect } from "react";
import { initFirebase } from "../../firebaseConfig.js";
import { useUser } from "@/store/user_store";

export default function Index() {
  const router = useRouter();
  const user = useUser((state: any) => state.user);
  const clearUser = useUser((state: any) => state.clearUser);
  const firstTime = useUser((state: any) => state.firstTime);

  useEffect(() => { // Initializes firebase connection
    initFirebase();
  }, []);

  setTimeout(() => {
    if (user && !firstTime) {
      router.push('./home');
    } else {
      router.push('./login_auth'); 
    }
  }, 1000);
};