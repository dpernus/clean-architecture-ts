import { UserCreator } from "../../domain/application/createUser";
import { User } from "../../domain/entities/user";
import { GetUserById } from "../../domain/application/getUserById";

export interface UserInput {
  age: number;
  name: string;
  email: string;
  summary: string;
  keyTerms: string[];
}

export function makeCreateUserController (userCreator: UserCreator) {
  return (userInfo: UserInput) => {   
    const { age, name, email, summary, keyTerms } = userInfo
    return userCreator(age, name, email, summary, keyTerms);
  }
}

export function makeGetUserByIdController (getUserById: GetUserById) {
  return (id: string) : User => getUserById(parseInt(id, 10));
}
