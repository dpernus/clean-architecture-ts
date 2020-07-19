import { UserRepository } from "../../domain/interfaces";
import { User, createUser } from "../../domain/entities/user";

export function makeInMemoryUserRepository(): UserRepository {
  const persistedUsers = new Map<string, string>();

  const addUser = (user: User) => {
    persistedUsers.set(user.id.toString(), JSON.stringify(user));
    console.log(persistedUsers.size);
    return user.id;
  };
  
  const getUser = (userId: number): User => {
    const dbUser = persistedUsers.get(userId.toString())
    
    if (dbUser === undefined) {
      throw new Error(`User with id ${userId} not found`);
    }
    
    const {personalData: {age, name, email}, summary, keyTerms, id} = JSON.parse(dbUser);
    return createUser(age, name, email, summary, keyTerms, id);
  };
  
    const updateUser = (user: User) => {
      const userId = user.id.toString();
      persistedUsers.set(userId, JSON.stringify(user));
      console.log('Update user', persistedUsers.size);
    }

  return { addUser, getUser, updateUser };
}
