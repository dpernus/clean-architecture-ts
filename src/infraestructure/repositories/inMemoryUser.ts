import { UserRepository } from "../../domain/interfaces";
import { User, createUser } from "../../domain/entities/user";

export function makeInMemoryUserRepository(): UserRepository {
  const persistedUsers: string[] = [];

  //TODO: update for create and modify user if exist
  const saveUser = (user: User) => {
    persistedUsers.push(JSON.stringify(user));
    console.log(persistedUsers.length);
    return user.id;
  };

  const getUser = (userId: number): User => {
    const dbUser = persistedUsers.find(
      (user: string) => JSON.parse(user).id === userId
    );

    if (dbUser === undefined) {
      throw new Error(`User with id ${userId} not found`);
    }
    const {personalData: {age, name, email}, summary, keyTerms, id} = JSON.parse(dbUser);
    return createUser(age, name, email, summary, keyTerms, id);
  };

  return { saveUser, getUser };
}
