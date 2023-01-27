import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { StyledButton } from "./UI/Button";
import { Input } from "./UI/Input";
import debounce from "lodash.debounce";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const UsernameForm = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const { user, username } = useAuth();

  useEffect(() => {
    checkUsername(usernameValue);
  }, [usernameValue]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "usernames", usernameValue);

    await setDoc(userDoc, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      username: usernameValue,
    });

    await setDoc(usernameDoc, {
      uid: user.uid,
    });
  };

  const changeHandler = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setUsernameValue(val);
      setIsLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setUsernameValue(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (findUsername) => {
      if (findUsername.length >= 3) {
        const ref = doc(db, "usernames", findUsername);
        const document = await getDoc(ref);
        const documentExists = document.data();

        console.log("Firestore read executed!");
        setIsValid(!documentExists);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={submitHandler}>
          <Input
            name="username"
            placeholder="username"
            value={usernameValue}
            onChange={changeHandler}
          ></Input>
          <StyledButton color="green" disabled={!isValid}>
            Choose
          </StyledButton>
          <br />
          <h3>states:</h3>
          <div>
            Username: {usernameValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
};

export default UsernameForm;
