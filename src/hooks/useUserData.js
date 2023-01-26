import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      console.log("user exist");
      const userCollectionRef = doc(db, "users", user.uid);
      console.log(userCollectionRef);
    } else {
      console.log("user dont exist");
    }
  }, [user]);

  return { user, username };
}
