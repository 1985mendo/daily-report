import { Button, Flex } from "@chakra-ui/react";
import EditUser from "@src/organisms/user/EditUser";
import { UserCard } from "@src/organisms/user/UserCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  doc,
  getFirestore,
  setDoc,
  DocumentReference,
  getDoc,
} from "firebase/firestore";

export type User = {
  name: string;
  image?: string | undefined;
  employeeId: string;
  email: string;
  area: string;
};

const auth = getAuth();
const db = getFirestore();

const saveUserToFirestore = async (updatedUser: User) => {
  const { uid } = auth.currentUser!;
  const userRef: DocumentReference<User> = doc(
    db,
    "users",
    uid
  ) as DocumentReference<User>;
  const prevUser = await getDoc(userRef).then((doc) => doc.data() as User);
  const newUser = { ...prevUser, ...updatedUser };
  if (newUser.image === undefined) {
    newUser.image = "";
  }
  await setDoc(userRef, newUser);
};

const Page = () => {
  const [user, setUser] = useState<User>({
    name: "編集画面で変更してください",
    image: undefined,
    employeeId: "編集画面で変更してください",
    email: "編集画面で変更してください",
    area: "編集画面で変更してください",
  });
  const [showEditUser, setShowEditUser] = useState(false);

  const handleEdit = () => {
    setShowEditUser(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef: DocumentReference<User> = doc(
          db,
          "users",
          user.uid
        ) as DocumentReference<User>;
        const userData = await getDoc(userRef).then(
          (doc) => doc.data() as User
        );
        if (userData) {
          setUser(userData);
        } else {
          setUser({
            name: "編集画面で変更してください",
            image: undefined,
            employeeId: "編集画面で変更してください",
            email: "編集画面で変更してください",
            area: "編集画面で変更してください",
          });
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSave = async (
    updatedUser: ((prevUser: User) => User) | User
  ) => {
    const updatedUserData =
      typeof updatedUser === "function" ? updatedUser(user) : updatedUser;
    setUser(updatedUserData);
    setShowEditUser(false);
    await saveUserToFirestore(updatedUserData);
  };

  const handleCancel = () => {
    setShowEditUser(false);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100%"
      backgroundColor="#e4f9f5"
      flexDirection="column"
      padding={10}
      margin="auto"
    >
      <Button onClick={handleEdit}>編集する</Button>
      {showEditUser ? (
        <EditUser user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <UserCard user={user} />
      )}
    </Flex>
  );
};

export default Page
