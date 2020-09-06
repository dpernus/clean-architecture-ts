import { User } from './../entities/user'
import { UserRepository } from './../interfaces'
import { makeError } from '../../utils/errors'

export type GetUserById = (id: number) => User
export function makeGetUserById(userRepository: UserRepository): GetUserById {
  return (id) => {
    const user = userRepository.getUser(id)
    if (user === null) {
      throw makeError('USER_NOT_FOUND', `User with id ${id} not found`)
    }
    return user
  }
}
