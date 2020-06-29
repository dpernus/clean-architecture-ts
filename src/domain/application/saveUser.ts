import { UserRepository } from "./../interfaces";
import { createUser } from "./../entities/user";

export type UserSaver = (age: number, name: string) => number;

export function makeUserSaver(userRepository: UserRepository): UserSaver {
  return (age, name) => {
    const user = createUser(age, name);
    const userId = userRepository.saveUser(user);
    return userId;
  };
}

// USE CASE WITH CLASS
// class UserSaver {
//   private persisterUser: UserPersister;

//   public constructor(usPersist: UserPersister) {
//     this.persisterUser = usPersist;
//   }

//   public saveUser(age: number, name: string): number {
//     const user = createUser(age, name);
//     const userId = this.persisterUser(user);
//     return userId;
//   }
// }
