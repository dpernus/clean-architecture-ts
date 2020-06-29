import { User } from "./../entities/user";
import { UserRepository } from "./../interfaces";

export type GetUserById = (id: number) => User;
export function makeGetUserById(userRepository: UserRepository): GetUserById {
  return id => userRepository.getUser(id);
}
