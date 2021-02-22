import NavBar from "../components/NavBar";
import { Button } from "grommet";
import { Google } from "grommet-icons";
import { auth } from "../firebase/config";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import MemoryPage from "../components/MemoryPage";

export default function Home() {
  let [user] = useAuthState(auth);

  return (
    <>
      <NavBar />
      {/* <AboutPage /> */}
      {user ? <MemoryPage /> : <SignIn />}
    </>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  return (
    <>
      <div className="signIn-container">
        {" "}
        <Button
          label="Sign in"
          icon={<Google color="plain" size="medium" />}
          onClick={() => signInWithGoogle()}
        />
      </div>
    </>
  );
}
