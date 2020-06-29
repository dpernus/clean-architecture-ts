import { UserSaver } from "../../domain/application/saveUser";
import { GetUserById } from "../../domain/application/getUserById";

interface UserInput {
  age: number;
  name: string;
}

export function saveUserController(
  userInfo: UserInput,
  saveUserUseCase: UserSaver
) {
  return saveUserUseCase(userInfo.age, userInfo.name);
}

export function getUserByIdController(
  id: string,
  getUserByIdUseCase: GetUserById
) {
  return getUserByIdUseCase(parseInt(id, 10));
}
