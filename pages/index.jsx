import NavBar from "../components/NavBar";
import { Button } from "grommet";
import { Google } from "grommet-icons";
import { auth } from "../firebase/config";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import MemoryPage from "../components/MemoryPage";
import { firestore, timestamp } from "../firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
  const usersRef = firestore.collection("users");
  const query = usersRef.orderBy("createdAt", "desc");
  const [usersData, loading, error] = useCollectionData(query, {
    idField: "uid",
  });

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const founduser =
      auth.currentUser &&
      usersData.find((usr) => (usr.uid = auth.currentUser.uid));

    await auth.signInWithPopup(provider);

    !founduser && auth.currentUser;
    usersRef.add({
      createdAt: timestamp(),
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
    });
  }

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
