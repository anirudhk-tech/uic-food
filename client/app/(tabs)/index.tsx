import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  setTimeout(() => {
    router.push('./auth');
  }, 1000);
};