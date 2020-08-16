import { UserCreator } from "../../domain/application/createUser";
import { User } from "../../domain/entities/user";
import { GetUserById } from "../../domain/application/getUserById";
import { Controller } from "./commons";

export interface UserInput {
  age: number;
  name: string;
  email: string;
  summary: string;
  keyTerms: string[];
}

export function makeCreateUserController (userCreator: UserCreator) : Controller <UserInput, { userId: number}> {
  return (userInfo) => {   
    const { age, name, email, summary, keyTerms } = userInfo
    const userId = userCreator(age, name, email, summary, keyTerms);
    return { response: { userId }, status: 200 }
  }
}

export function makeGetUserByIdController (getUserById: GetUserById) : Controller <string, User> {
  return (id)  => {
    try{
      const user = getUserById(parseInt(id, 10));
      return { response: user, status: 200}
    } catch({ message, code }) {
      return { response: { code, message }, status: code === 'USER_NOT_FOUND' ? 404 : 500}
    }
  }
}
