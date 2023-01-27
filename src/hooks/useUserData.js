import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsub;
    if (user) {
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
      console.log(unsub);
    } else {
      setUsername(null);
    }
    return unsub;
  }, [user]);

  return { user, username };
}
