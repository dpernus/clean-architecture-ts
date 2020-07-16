import { UserSaver } from "../../domain/application/saveUser";
import { GetUserById } from "../../domain/application/getUserById";

interface UserInput {
  age: number;
  name: string;
  email: string;
  summary: string;
  keyTerms: string[];
}

export function saveUserController(
  userInfo: UserInput,
  saveUserUseCase: UserSaver
) {
  const { age, name, email, summary, keyTerms } = userInfo
  return saveUserUseCase(age, name, email, summary, keyTerms);
}

export function getUserByIdController(
  id: string,
  getUserByIdUseCase: GetUserById
) {
  return getUserByIdUseCase(parseInt(id, 10));
}
