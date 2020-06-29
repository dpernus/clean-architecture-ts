import { User } from "./entities/user";

export interface UserRepository {
  saveUser: (u: User) => number;
  getUser: (userId: number) => User;
}
