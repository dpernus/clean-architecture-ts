import { User } from "./entities/user";

export interface UserRepository {
  addUser: (u: User) => number;
  getUser: (userId: number) => User;
  updateUser: (user: User) => void;
}
