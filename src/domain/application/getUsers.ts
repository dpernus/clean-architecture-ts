import { makeError } from '../../utils/errors'
import { User } from '../entities/user'
import { UserRepository } from '../interfaces'

export type GetUsers = () => Promise<User[]>

export function makeGetUsers(userRespository: UserRepository): GetUsers {
  return async () => {
    const users = await userRespository.getUsers()
    if (users.length === 0) {
      throw makeError('USERS_NOT_FOUND', 'There is no users to show')
    }
    return users
  }
}
