import { UserRepository } from '../interfaces'
import { createUser } from '../entities/user'

export type UserCreator = (
  age: number,
  name: string,
  email: string,
  summary: string,
  keyTerms: string[],
) => Promise<number>

export function makeUserCreator(userRepository: UserRepository): UserCreator {
  return async (age, name, email, summary, keyTerms) => {
    const user = createUser(age, name, email, summary, keyTerms)
    const userId = await userRepository.addUser(user)
    return userId
  }
}

// USE CASE WITH CLASS
// class UserCreator {
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
