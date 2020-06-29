import { UserRepository } from "../../domain/interfaces";
import { User, createUser } from "../../domain/entities/user";

export function makeInMemoryUserRepository(): UserRepository {
  const persistedUsers: string[] = [];

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
    const jsonUser = JSON.parse(dbUser);
    return createUser(jsonUser.age, jsonUser.name, jsonUser.id);
  };

  return { saveUser, getUser };
}
