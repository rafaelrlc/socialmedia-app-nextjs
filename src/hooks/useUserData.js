import { useEffect, useState } from "react";
import { db, auth } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsub;

    if (user) {
      console.log("oi");
      const userCollectionRef = doc(db, "users", user.uid);

      unsub = onSnapshot(
        userCollectionRef,
        {
          includeMetadataChanges: true,
        },
        (doc) => {
          setUsername(doc.data()?.username);
        }
      );
    } else {
      setUsername(null);
    }
    return unsub;
  }, [user]);

  return { user, username, setUser }; //set the userContext value
}
