import { ref } from "firebase/database";
import db from "../firebaseConfig";

const firebaseRef = (collectoinRef: string) => {
  return ref(db, `/${collectoinRef}`);
};

export default firebaseRef;
