import { UserRepository } from "../../domain/interfaces";
import { User, createUser } from "../../domain/entities/user";

export function makeInMemoryUserRepository(): UserRepository {
  const persistedUsers = new Map<string, string>();

  const addUser = (user: User) => {
    persistedUsers.set(user.id.toString(), JSON.stringify(user));
    console.log(persistedUsers.size);
    return user.id;
  };
  
  const getUser = (userId: number): User | null => {
    const dbUser = persistedUsers.get(userId.toString())
    
    if (dbUser !== undefined) {
      const {personalData: {age, name, email}, summary, keyTerms, workExperience, education, id} = JSON.parse(dbUser);
      return createUser(age, name, email, summary, keyTerms, workExperience, education, id);
    }
    
    return null
  };
  
    const updateUser = (user: User) => {
      const userId = user.id.toString();
      persistedUsers.set(userId, JSON.stringify(user));
    }

  return { addUser, getUser, updateUser };
}
