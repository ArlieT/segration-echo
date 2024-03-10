import { TCredential } from "../_store/_utils/auth";

const mockUsers: TCredential[] = [
  { username: "admin", password: "admin", role: "ADMIN" },
  { username: "student1", password: "123123", role: "STUDENT" },
  { username: "student2", password: "123123", role: "STUDENT" },
];
export default mockUsers;
