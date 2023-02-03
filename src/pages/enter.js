import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { StyledButton } from "@/components/UI/Button";
import { useAuth } from "@/hooks/useAuth";
import UsernameForm from "@/components/UsernameForm";
const provider = new GoogleAuthProvider();

const Enter = (props) => {
  const { user, username } = useAuth();
  console.log(user, username);

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const userLogged = result.user;

      //...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      //...
    }
  };

  return (
    <main>
      <button onClick={() => console.log(user, username)}>press</button>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <div>
            {" "}
            <StyledButton
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign Out
            </StyledButton>
          </div>
        )
      ) : (
        <div>
          {" "}
          <StyledButton className="btn-google" onClick={signInWithGoogle}>
            <img src={"/Google__G__Logo.svg.png"} /> Sign in with Google
          </StyledButton>
        </div>
      )}
    </main>
  );
};

export default Enter;
