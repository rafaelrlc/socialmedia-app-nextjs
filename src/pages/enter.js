import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { StyledButton } from "@/components/UI/Button";
import { useAuth } from "@/hooks/useAuth";
import UsernameForm from "@/components/UsernameForm";
const provider = new GoogleAuthProvider();

const Enter = (props) => {
  const { user, username } = useAuth();

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
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <StyledButton onClick={() => auth.signOut()}>Sign Out</StyledButton>
        )
      ) : (
        <StyledButton className="btn-google" onClick={signInWithGoogle}>
          <img src={"/Google__G__Logo.svg.png"} /> Sign in with Google
        </StyledButton>
      )}
    </main>
  );
};

export default Enter;
