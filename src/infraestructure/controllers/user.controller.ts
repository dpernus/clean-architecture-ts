import { UserCreator } from '../../domain/application/createUser'
import { User } from '../../domain/entities/user'
import { GetUserById } from '../../domain/application/getUserById'
import { Controller } from './commons'
import { GetUsers } from '../../domain/application/getUsers'

export interface UserInput {
  age: number
  name: string
  email: string
  address: string
  social: string
  git: string
  picture?: string
  summary: string
  keyTerms: string[]
}

interface UserBasicInfo {
  id: number
  name: string
  keyTerms: string[]
  avatar: string
}

export function makeCreateUserController(userCreator: UserCreator): Controller<UserInput, { userId: number }> {
  return async (userInfo) => {
    const { age, name, email, address, social, git, picture, summary, keyTerms } = userInfo
    const userId = await userCreator(age, name, email, address, social, git, picture || '', summary, keyTerms)
    return { response: { userId }, status: 200 }
  }
}

export function makeGetUserByIdController(getUserById: GetUserById): Controller<string, User> {
  return async (id) => {
    try {
      const user = await getUserById(parseInt(id, 10))
      return { response: user, status: 200 }
    } catch ({ message, code }) {
      return { response: { code, message }, status: code === 'USER_NOT_FOUND' ? 404 : 500 }
    }
  }
}

export function makeGetUsersController(getUsers: GetUsers): Controller<void, UserBasicInfo[]> {
  return async () => {
    try {
      const users = await getUsers()
      const usersBasicInfo = users.map(
        (user): UserBasicInfo => {
          return {
            id: user.id,
            name: user.personalData.name,
            keyTerms: user.keyTerms,
            avatar: user.personalData.picture ?? '',
          }
        },
      )
      return { response: usersBasicInfo, status: 200 }
    } catch ({ message, code }) {
      return { response: { code, message }, status: code === 'USERS_NOT_FOUND' ? 404 : 500 }
    }
  }
}
